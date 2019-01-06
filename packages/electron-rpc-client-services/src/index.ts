import { EnvelopeType } from 'electron-rpc-types';
import { Client } from 'electron-rpc-client';
import { Factory } from './Factory';

export { Procedure, ServiceProcedure } from './Procedure';
export { Service } from './Service';
export { Factory };

declare global {
    interface FactoryConstructor {
        new (client: Client): Factory;
    }
    interface ElectronRPCGlobal {
        Procedure(name: string): ClassDecorator;
        Service(rpcName: string, type?: EnvelopeType): MethodDecorator;
        Factory: FactoryConstructor;
    }
    interface Window {
        ElectronRPC: ElectronRPCGlobal;
    }
}
