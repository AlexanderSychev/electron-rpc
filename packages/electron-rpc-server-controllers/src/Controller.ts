import { RPC_CONTROLLER_NAME } from './internalConstants';

export const Controller = (name?: string): ClassDecorator => (target: Function): void => {
    if (Reflect.hasOwnMetadata(RPC_CONTROLLER_NAME, target.prototype)) {
        throw new Error(`@Controller() decorator can not be applied twice`);
    }
    let controllerName: string;
    if (name) {
        controllerName = name;
    } else if ((<any>target)['displayName']) {
        controllerName = (<any>target)['displayName'];
    } else if (target.name) {
        controllerName = target.name;
    } else {
        throw new Error(
            `Controller name must be defined via argument, via "displayName" static property or via class name`,
        );
    }
    Reflect.defineMetadata(RPC_CONTROLLER_NAME, controllerName, target.prototype);
};
