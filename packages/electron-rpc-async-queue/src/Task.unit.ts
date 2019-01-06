import * as assert from 'assert';

import { Task } from './Task';
import { TaskEventType } from './TaskEventType';

// Constants
const TEST_ERROR_MESSAGE: string = 'Test error';
const DELAY: number = 500;

// Helpers

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

const makeSyncTask = (throwsError?: boolean): Task<[], void> =>
    new Task(
        throwsError
            ? () => {
                  throw new Error(TEST_ERROR_MESSAGE);
              }
            : () => void 0,
    );

const makeAsyncTask = (throwsError?: boolean): Task<[], void> =>
    new Task(
        throwsError
            ? async () => {
                  await sleep(DELAY);
                  throw new Error(TEST_ERROR_MESSAGE);
              }
            : async () => {
                  await sleep(DELAY);
              },
    );

const getTestCaseDescription = (isAsync: boolean, throwsError: boolean) =>
    `${isAsync ? 'Async' : 'Sync'} task${throwsError ? ' with error' : ''}`;

const createEventsTestCase = (isAsync: boolean, throwsError: boolean) => {
    it(`${getTestCaseDescription(isAsync, throwsError)} events`, async () => {
        const task = isAsync ? makeAsyncTask(throwsError) : makeSyncTask(throwsError);
        const events: TaskEventType[] = [];
        task.on(TaskEventType.START, () => {
            events.push(TaskEventType.START);
        });
        task.on(throwsError ? TaskEventType.ERROR : TaskEventType.SUCCESS, () => {
            events.push(throwsError ? TaskEventType.ERROR : TaskEventType.SUCCESS);
        });
        task.on(TaskEventType.END, () => {
            events.push(TaskEventType.END);
        });
        await task.run();
        const result: string = events.join();
        const middleEvent: TaskEventType = throwsError ? TaskEventType.ERROR : TaskEventType.SUCCESS;
        const expected: string = `${TaskEventType.START},${middleEvent},${TaskEventType.END}`;
        assert.equal(result, expected, `Events order must be: "${expected}"`);
    });
};

const createTaskArgsAndResultTestCase = (isAsync: boolean, throwsError: boolean) => {
    it(`${getTestCaseDescription(isAsync, throwsError)} return ${throwsError ? 'error' : 'result'}`, async () => {
        const value: string = 'echo';
        const expectedError: string = `Error: ${TEST_ERROR_MESSAGE}`;
        const task = new Task<[string], string>(
            isAsync
                ? async (message: string): Promise<string> => {
                      await sleep(DELAY);
                      if (throwsError) {
                          throw new Error(TEST_ERROR_MESSAGE);
                      }
                      return message;
                  }
                : (message: string): string => {
                      if (throwsError) {
                          throw new Error(TEST_ERROR_MESSAGE);
                      }
                      return message;
                  },
            value,
        );
        const promise: Promise<[string | null, string | null]> = new Promise<[string | null, string | null]>(
            resolve => {
                task.on(TaskEventType.END, (error: string | null, message: string | null) => {
                    resolve([error, message]);
                });
            },
        );
        await task.run();
        const [error, message] = await promise;
        if (throwsError) {
            assert.equal(error, expectedError, `Error must ends with "${TEST_ERROR_MESSAGE}"`);
        } else {
            assert.equal(message, value, `Result must equal ${value}`);
        }
    });
};

// Test cases
describe('"Task" class unit tests', () => {
    createEventsTestCase(false, false);
    createEventsTestCase(false, true);
    createEventsTestCase(true, false);
    createEventsTestCase(true, true);
    createTaskArgsAndResultTestCase(false, false);
    createTaskArgsAndResultTestCase(false, true);
    createTaskArgsAndResultTestCase(true, false);
    createTaskArgsAndResultTestCase(true, true);
});
