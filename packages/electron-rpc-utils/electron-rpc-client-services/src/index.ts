import { EnvelopeType } from 'electron-rpc-types';
import { Client } from 'electron-rpc-client';

export { bindServicesToClient, stub } from './lib';
export { Procedure } from './Procedure';
export { Service } from './Service';

declare global {
    interface ElectronRPCGlobal {
        bindServicesToClient(client: Client, services: Function): void;
        Procedure(name: string): ClassDecorator;
        Service(rpcName: string, type?: EnvelopeType): MethodDecorator;
        stub<T>(...args: any[]): T;
    }
    interface Window {
        ElectronRPC: ElectronRPCGlobal;
    }
}
