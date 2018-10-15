import { ControllersRepository } from './ControllersRepository';

export const Action = (rpcName: string): MethodDecorator => (
    target: any,
    originName: string | symbol,
    descriptor: PropertyDescriptor,
): PropertyDescriptor => {
    const fn: Function = descriptor.value;
    if (typeof fn !== 'function') {
        throw new Error(`@Action() decorator can be applied only to methods, not "${typeof fn}"`);
    }
    ControllersRepository.getInstance().addAction(originName, rpcName, target.constructor);
    return descriptor;
};
