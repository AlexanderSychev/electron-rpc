import { Resolver, Newable } from 'electron-rpc-types';
import { getControllerMethodName } from 'electron-rpc-utils';
import { Server } from 'electron-rpc-server';

import { RPC_CONTROLLER_NAME, RPC_CONTROLLER_ACTION_NAME } from './internalConstants';

export type ControllersData = [Function, ...any[]];

export function bindControllersToServer(server: Server, classesWithArgs: (ControllersData | Function)[]): void {
    const resolver: Resolver = {};
    for (const classWithArg of classesWithArgs) {
        const ctor = Array.isArray(classWithArg) ? classWithArg[0] : classWithArg;
        const args = Array.isArray(classWithArg) ? classWithArg.slice(1) : [];

        if (Reflect.hasOwnMetadata(RPC_CONTROLLER_NAME, ctor.prototype)) {
            const controllerName: string = Reflect.getMetadata(RPC_CONTROLLER_NAME, ctor.prototype);
            const controllersMethods: [string, string][] = Object.keys(ctor.prototype)
                .filter(key => Reflect.hasOwnMetadata(RPC_CONTROLLER_ACTION_NAME, ctor.prototype[key]))
                .map(
                    (key): [string, string] => [
                        Reflect.getMetadata(RPC_CONTROLLER_ACTION_NAME, ctor.prototype[key]),
                        key,
                    ],
                );
            const controller = new (<Newable>ctor)(...args);
            for (const [actionName, methodName] of controllersMethods) {
                resolver[getControllerMethodName(controllerName, actionName)] = controller[methodName].bind(controller);
            }
        }
    }
    server.extendResolver(resolver);
}
