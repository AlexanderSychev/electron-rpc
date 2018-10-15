export { TaskBody } from './TaskBody';
export { TaskResult } from './TaskResult';

import { AsyncQueue } from './AsyncQueue';
export { AsyncQueue };

declare global {
    interface AsyncQueueConstructor {
        new (): AsyncQueue;
    }
    interface ElectronRPCGlobal {
        AsyncQueue: AsyncQueueConstructor;
    }
    interface Window {
        ElectronRPC: ElectronRPCGlobal;
    }
}

