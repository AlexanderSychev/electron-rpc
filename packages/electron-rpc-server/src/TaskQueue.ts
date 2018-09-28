import { isNil } from 'electron-rpc-channels-names-resolver';

/** Common task signature */
export interface Task {
    (): Promise<void>;
}

/** Queue structure */
export class TaskQueue {
    /** Queue items array */
    private activeTask: Promise<void> | null = null;
    /** Add element to queue */
    public async push(item: Task): Promise<void> {
        if (!isNil(this.activeTask)) {
            await this.activeTask;
        }
        this.activeTask = item();
        await this.activeTask;
        this.activeTask = null;
    }
}
