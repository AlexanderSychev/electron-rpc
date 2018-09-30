import * as assert from 'assert';

import { TaskQueue } from './TaskQueue';

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

const TASK_DELAY: number = 500;
const makeSyncTask = (index: number, executed: string[]) => () => {
    executed.push(`#${index}`);
};
const makeAsyncTask = (index: number, executed: string[]) => async () => {
    await sleep(TASK_DELAY);
    executed.push(`#${index}`);
};

const makeTestCase = (isFirstAsync: boolean, isSecondAsync: boolean, isThirdAsync: boolean) => {
    const firstTaskType: string = isFirstAsync ? 'Async' : 'Sync';
    const secondTaskType: string = isSecondAsync ? 'async' : 'sync';
    const thirdTaskType: string = isThirdAsync ? 'async' : 'sync';
    it(`${firstTaskType} task #1, ${secondTaskType} task #2 and ${thirdTaskType} task #3 runs in turn`, async () => {
        const queue = new TaskQueue();
        const executed: string[] = [];
        const task1 = isFirstAsync ? makeAsyncTask(1, executed) : makeSyncTask(1, executed);
        const task2 = isSecondAsync ? makeAsyncTask(2, executed) : makeSyncTask(2, executed);
        const task3 = isThirdAsync ? makeAsyncTask(3, executed) : makeSyncTask(3, executed);
        queue.push(task1);
        queue.push(task2);
        await queue.push(task3);
        const result: string = executed.join();
        const expected: string = '#1,#2,#3';
        assert.equal(result, expected, `Executed list must equal "${expected}"`);
    });
};

describe('"TaskQueue" class unit tests', () => {
    makeTestCase(false, false, false);
    makeTestCase(true, false, false);
    makeTestCase(true, true, false);
    makeTestCase(true, true, true);
    makeTestCase(false, true, true);
    makeTestCase(true, false, true);
});
