import { RPC_CONTROLLER_ACTION_NAME } from './internalConstants';

export const Action = (rpcName?: string): MethodDecorator => (
    _: any,
    originName: string | symbol,
    descriptor: PropertyDescriptor,
): PropertyDescriptor => {
    const fn: Function = descriptor.value;
    let procedureName: string;
    if (typeof fn !== 'function') {
        throw new Error(`@Action() decorator can be applied only to methods, not "${typeof fn}"`);
    }
    if (Reflect.hasOwnMetadata(RPC_CONTROLLER_ACTION_NAME, fn)) {
        throw new Error(`@Action() decorator can not be applied twice`);
    }
    if (rpcName) {
        procedureName = rpcName;
    } else {
        procedureName = String(originName);
    }
    Reflect.defineMetadata(RPC_CONTROLLER_ACTION_NAME, procedureName, fn);
    return descriptor;
};
