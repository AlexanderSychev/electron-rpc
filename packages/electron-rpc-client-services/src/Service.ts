import { Newable } from 'electron-rpc-types';

import { ServiceRepository } from './ServiceRepository';

export const Service = (name: string): ClassDecorator => (cls: Function): void => {
    ServiceRepository.getInstance().addService(name, <Newable>cls);
};
