import { Newable } from 'electron-rpc-types';

import { ControllersRepository } from './ControllersRepository';

export const Controller = (name: string): ClassDecorator => (target: Function): void => {
    ControllersRepository.getInstance().addController(name, <Newable>target);
};
