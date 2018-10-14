import { EnvelopeType } from 'electron-rpc-types';

import { ServiceRepository } from './ServiceRepository';

export const Procedure = (rpcName: string, type: EnvelopeType = EnvelopeType.BLOCKING): MethodDecorator => (
    target: any,
    originName: string | symbol,
    descriptor: PropertyDescriptor,
): PropertyDescriptor => {
    const fn: Function = descriptor.value;
    if (typeof fn !== 'function') {
        throw new Error(`@Procedure() decorator can be applied only to methods, not "${typeof fn}"`);
    }
    ServiceRepository.getInstance().addProcedure({ rpcName, originName, type }, target.constructor);
    return descriptor;
};
