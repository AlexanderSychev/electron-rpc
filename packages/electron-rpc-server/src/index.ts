import { Resolver, ChannelsNamesParameters } from 'electron-rpc-types';
import { IpcMain, IpcRenderer } from 'electron';

import { Server } from './Server';

export { TaskBody, TaskQueue, TaskEventType, TaskResult } from './task';
export { Server };

declare global {
    interface ServerConstructor {
        new (
            bus: IpcMain | IpcRenderer,
            resolver: Resolver,
            channels?: ChannelsNamesParameters | null | undefined,
        ): Server;
    }
    interface ElectronRPCGlobal {
        Server: ServerConstructor;
    }
    interface Window {
        ElectronRPC: ElectronRPCGlobal;
    }
}
