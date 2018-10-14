import { Server } from 'electron-rpc-server';

export { bindControllersToServer } from './bindControllersToServer';
export { Controller } from './Controller';
export { Action } from './Action';

declare global {
    interface ElectronRPCGlobal {
        bindControllersToServer(server: Server, classes: Function[]): void;
        Controller(name: string): ClassDecorator;
        Action(rpcName: string): MethodDecorator;
    }
    interface Window {
        ElectronRPC: ElectronRPCGlobal;
    }
}
