import { TaskBody } from './TaskBody';
import { Task } from './Task';
import { TaskEventType } from './TaskEventType';
import { TaskResult } from './TaskResult';

/** Queue structure */
export class AsyncQueue {
    /** Tasks queue array */
    private queue: Task<any[], any>[] = [];
    /** Add element to queue */
    public async push<A extends any[] = any[], R = any>(body: TaskBody<A, R>, ...args: A): Promise<TaskResult<A, R>> {
        const task: Task<A, R> = new Task<A, R>(body, ...args);
        const promise = new Promise<TaskResult<A, R>>(resolve =>
            task.on(TaskEventType.END, (error: string, result: R) => {
                this.queue.shift();
                resolve({ error, result, args });
            }),
        );
        this.queue.push(<any>task);
        if (this.queue.length > 1) {
            const TASK_INDEX: number = this.queue.length - 1;
            const PREV_TASK_INDEX = TASK_INDEX - 1;
            const prevTask = this.queue[PREV_TASK_INDEX];
            prevTask.on(TaskEventType.END, () => {
                task.run();
            });
        } else {
            task.run();
        }
        return await promise;
    }
}
