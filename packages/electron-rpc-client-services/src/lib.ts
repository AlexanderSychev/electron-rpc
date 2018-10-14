import { Client } from 'electron-rpc-client';
import { getControllerMethodName } from 'electron-rpc-utils';

import { ServiceRepository } from './ServiceRepository';

/** Stub function for not modified method body */
export const stub = <T>(...args: any[]): T => <any>{ args };

/** Bind services classes to RPC Client */
export const bindServicesToClient = (client: Client, services: Function[]): void => {
    const repository: ServiceRepository = ServiceRepository.getInstance();
    for (const service of services) {
        if (repository.isService(service)) {
            const serviceName = repository.getServiceName(service);
            const procedures = repository.getProcedures(service);
            for (const { rpcName, originName, type } of procedures) {
                service.prototype[originName] = (...args: any[]) =>
                    client.request({
                        type,
                        args,
                        procedure: getControllerMethodName(serviceName, rpcName),
                    });
            }
        }
    }
};
