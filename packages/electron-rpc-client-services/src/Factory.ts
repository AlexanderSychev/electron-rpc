import { Client } from 'electron-rpc-client';
import { Newable } from 'electron-rpc-types';
import { getControllerMethodName } from 'electron-rpc-utils';

import { RPC_SERVICE_NAME, RPC_SERVICE_METHODS_NAMES } from './internalConstants';
import { ProcedureInfoMap } from './Procedure';

/** Services factory */
export class Factory {
    /** RPC Client instance */
    private client: Client;

    public constructor(client: Client) {
        this.client = client;
    }

    public createService<T>(ctor: Newable<T>, ...args: any[]): T {
        if (!Reflect.hasOwnMetadata(RPC_SERVICE_NAME, ctor.prototype)) {
            throw new Error(`@Service decorator is not applied`);
        }

        const serviceName = Reflect.getMetadata(RPC_SERVICE_NAME, ctor.prototype);
        const proceduresMap: ProcedureInfoMap = Reflect.getMetadata(RPC_SERVICE_METHODS_NAMES, ctor.prototype);
        const service: T = new ctor(...args);

        for (const [originName, { type, rpcName }] of proceduresMap) {
            (<any>service)[originName] = (...args: any[]): Promise<any> =>
                this.client.request({
                    type,
                    args,
                    procedure: getControllerMethodName(serviceName, rpcName),
                });
        }

        return service;
    }
}
