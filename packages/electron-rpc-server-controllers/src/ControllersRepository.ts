import { isNil } from 'electron-rpc-utils';
import { Newable, ActionData } from 'electron-rpc-types';

/** Repository */
export class ControllersRepository {
    /** Repository instance */
    private static instance: ControllersRepository;
    /** Controllers */
    private controllers: Map<Newable, string>;
    /**  */
    private controllersActions: Map<Newable, ActionData[]>;
    /** @constructor */
    private constructor() {
        this.controllers = new Map<Newable, string>();
        this.controllersActions = new Map<Newable, ActionData[]>();
    }
    /** Returns manager instance */
    public static getInstance(): ControllersRepository {
        if (isNil(this.instance)) {
            ControllersRepository.instance = new ControllersRepository();
        }
        return ControllersRepository.instance;
    }
    /** Add controller to repository */
    public addController(name: string, controller: Newable): void {
        this.controllers.set(controller, name);
    }
    /** Add action repository */
    public addAction(originName: string | symbol, rpcName: string, controller: Newable): void {
        if (isNil(this.controllersActions.get(controller))) {
            this.controllersActions.set(controller, []);
        }
        const index: number = this.controllersActions.get(controller)!.findIndex(data => data.rpcName === rpcName);
        if (index === -1) {
            this.controllersActions.get(controller)!.push({ rpcName, originName });
        } else {
            this.controllersActions.get(controller)![index] = { rpcName, originName };
        }
    }
    /** Returns "true" if function is controller class */
    public isController(ctor: Newable): boolean {
        return this.controllers.has(ctor);
    }
    public getControllerName(ctor: Newable): string {
        return this.controllers.get(ctor)!;
    }
    /** Returns method names */
    public getMethodsNames(ctor: Newable): ActionData[] {
        const names = this.controllersActions.get(ctor);
        return isNil(names) ? [] : names;
    }
}
