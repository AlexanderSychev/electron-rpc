import { Resolver, Newable } from 'electron-rpc-types';
import { getControllerMethodName } from 'electron-rpc-utils';
import { Server } from 'electron-rpc-server';

import { ControllersRepository } from './ControllersRepository';

export type ControllersData = [Function, ...any[]];

export function bindControllersToServer(server: Server, classesWithArgs: (ControllersData | Function)[]): void {
    const repository = ControllersRepository.getInstance();
    const resolver: Resolver = {};
    for (const classWithArg of classesWithArgs) {
        const ctor = Array.isArray(classWithArg) ? classWithArg[0] : classWithArg;
        const args = Array.isArray(classWithArg) ? classWithArg.slice(1) : [];
        if (repository.isController(<Newable>ctor)) {
            const name = repository.getControllerName(<Newable>ctor);
            const methods = repository.getMethodsNames(<Newable>ctor);
            const controller = new (<Newable>ctor)(...args);
            for (const { rpcName, originName } of methods) {
                resolver[getControllerMethodName(name, rpcName)] = controller[originName].bind(controller);
            }
        }
    }
    server.extendResolver(resolver);
}
