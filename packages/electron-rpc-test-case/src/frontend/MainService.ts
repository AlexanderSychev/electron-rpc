import { Service, Procedure, ServiceProcedure, EnvelopeType } from 'electron-rpc-common';

@Service('Main')
export class MainService {
    @Procedure('nonblocking', EnvelopeType.NONBLOCKING)
    public nonblocking!: ServiceProcedure<[], void>;

    @Procedure('blocking', EnvelopeType.BLOCKING)
    public blocking!: ServiceProcedure<[], void>;

    @Procedure('foo', EnvelopeType.BLOCKING)
    public foo!: ServiceProcedure<[], void>;

    @Procedure('throwable', EnvelopeType.NONBLOCKING)
    public throwable!: ServiceProcedure<[], void>;

    @Procedure('echo', EnvelopeType.NONBLOCKING)
    public echo!: ServiceProcedure<[string], void>;
}
