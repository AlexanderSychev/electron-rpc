import { EventEmitter } from 'events';

import { TaskBody } from './TaskBody';
import { TaskEventType } from './TaskEventType';

/** Asynchronous task */
export class Task<A extends any[] = any[], R = any> extends EventEmitter {
    /** Executable body of task */
    private body: TaskBody<A, R>;
    /** Task body arguments */
    private args: A;
    /** @constructor */
    public constructor(body: TaskBody, ...args: A) {
        super();
        this.body = body;
        this.args = args;
    }
    /** Run task */
    public async run(): Promise<void> {
        let result: R | null = null;
        let error: string | null = null;
        this.emit(TaskEventType.START);
        try {
            result = await this.body(...this.args);
            this.emit(TaskEventType.SUCCESS, result);
        } catch (err) {
            error = String(err);
            this.emit(TaskEventType.ERROR, error);
        }
        this.emit(TaskEventType.END, error, result);
    }
}
