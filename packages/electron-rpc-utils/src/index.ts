import { ChannelsNamesParameters, ChannelsNamesProperties } from 'electron-rpc-types';

import { Loggable } from './Loggable';
export { Loggable };

export { isNil } from './isNil';
export { resolve } from './resolve';
export { getControllerMethodName } from './getControllerMethodName';

declare global {
    /** Constructor of "Loggable" */
    interface LoggableConstructor {
        new (): Loggable;
    }
    interface ElectronRPCGlobal {
        /** Loggable entity */
        Loggable: LoggableConstructor;
        /** Returns "true" if argument is "null" or "undefined" */
        isNil(value: any): value is null | undefined;
        /** Resolves client channels parameters */
        resolve(params?: ChannelsNamesParameters | null | undefined): ChannelsNamesProperties;
        /** Builds remote procedure name for controller and service */
        getControllerMethodName(rpcServiceName: string, rpcMethodName: string): string;
    }
    interface Window {
        /** Electron RPC Client bundle library */
        ElectronRPC: ElectronRPCGlobal;
    }
}
