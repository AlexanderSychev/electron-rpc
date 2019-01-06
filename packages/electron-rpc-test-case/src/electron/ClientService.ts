import { Service, Procedure, EnvelopeType, ServiceProcedure } from 'electron-rpc-common';

@Service('Client')
export class ClientService {
    @Procedure('getLogsOutput', EnvelopeType.NONBLOCKING)
    public getLogsOutput!: ServiceProcedure<[], string>;
}
