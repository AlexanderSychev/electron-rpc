import { RPC_SERVICE_NAME } from './internalConstants';

export const Service = (name?: string): ClassDecorator => (cls: Function): void => {
    if (Reflect.hasOwnMetadata(RPC_SERVICE_NAME, cls.prototype)) {
        throw new Error(`"@Service() decorator can't be applied twice`);
    }
    let serviceName: string;
    if (name) {
        serviceName = name;
    } else if ((<any>cls)['displayName']) {
        serviceName = (<any>cls)['displayName'];
    } else if (cls.name) {
        serviceName = cls.name;
    } else {
        throw new Error(
            `Service name must be defined (via argument, via "displayName" static property or via class name)`,
        );
    }
    Reflect.defineMetadata(RPC_SERVICE_NAME, serviceName, cls.prototype);
};
