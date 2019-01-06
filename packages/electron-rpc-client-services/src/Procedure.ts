import { EnvelopeType } from 'electron-rpc-types';

import { RPC_SERVICE_METHODS_NAMES } from './internalConstants';

export interface ServiceProcedure<A extends any[] = any[], R = any> {
    (...args: A): Promise<R>;
}

export interface ProcedureInfo {
    rpcName: string;
    type: EnvelopeType;
}

export type ProcedureInfoMap = Map<string | symbol, ProcedureInfo>;

export const Procedure = (procedureName?: string, type: EnvelopeType = EnvelopeType.BLOCKING): PropertyDecorator => (
    target: any,
    originName: string | symbol,
): void => {
    if (!Reflect.hasOwnMetadata(RPC_SERVICE_METHODS_NAMES, target)) {
        Reflect.defineMetadata(RPC_SERVICE_METHODS_NAMES, new Map<string | symbol, ProcedureInfo>(), target);
    }
    const methodsNames: ProcedureInfoMap = Reflect.getMetadata(RPC_SERVICE_METHODS_NAMES, target);

    if (methodsNames.has(originName)) {
        throw new Error(`"@Procedure() decorator can't be applied twice`);
    }

    let rpcName: string;
    if (procedureName) {
        rpcName = procedureName;
    } else {
        rpcName = String(originName);
    }

    methodsNames.set(originName, { rpcName, type });
};
