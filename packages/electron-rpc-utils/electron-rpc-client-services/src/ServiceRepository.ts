import { isNil } from 'electron-rpc-utils';
import { Newable, ActionData, EnvelopeType } from 'electron-rpc-types';

/** Procedure data */
export interface ProcedureData extends ActionData {
    /** Type of envelope */
    type: EnvelopeType;
}

/** Services repository */
export class ServiceRepository {
    /** Service repository instance */
    private static instance: ServiceRepository;
    /** Services dictionary */
    private services: Map<Newable, string>;
    /** Services procedures methods */
    private servicesProcedures: Map<Newable, ProcedureData[]>;
    /** @constructor */
    private constructor() {
        this.services = new Map<Newable, string>();
        this.servicesProcedures = new Map<Newable, ProcedureData[]>();
    }
    public static getInstance(): ServiceRepository {
        if (isNil(ServiceRepository.instance)) {
            ServiceRepository.instance = new ServiceRepository();
        }
        return ServiceRepository.instance!;
    }
    /** Add service */
    public addService(name: string, service: Newable): void {
        this.services.set(service, name);
    }
    /** Add remote procedure call method */
    public addProcedure({ rpcName, originName, type }: ProcedureData, service: Newable): void {
        if (!this.servicesProcedures.has(service)) {
            this.servicesProcedures.set(service, []);
        }
        const index: number = this.servicesProcedures.get(service)!.findIndex(value => value.rpcName === rpcName);
        if (index === -1) {
            this.servicesProcedures.get(service)!.push({ rpcName, originName, type });
        } else {
            this.servicesProcedures.get(service)![index] = { rpcName, originName, type };
        }
    }
    /** Returns "true" if class marked as service */
    isService(cls: Function): boolean {
        return this.services.has(<Newable>cls);
    }
    /** Returns service name */
    getServiceName(cls: Function): string {
        return this.services.get(<Newable>cls)!;
    }
    /** Returns remote procedures data for services */
    getProcedures(cls: Function): ProcedureData[] {
        return this.servicesProcedures.has(<Newable>cls) ? this.servicesProcedures.get(<Newable>cls)! : [];
    }
}
