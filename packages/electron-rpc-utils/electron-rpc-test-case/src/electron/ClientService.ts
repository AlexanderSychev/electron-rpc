import { Service, Procedure, EnvelopeType, stub } from 'electron-rpc-common';

@Service('Client')
export class ClientService {
    @Procedure('getLogsOutput', EnvelopeType.NONBLOCKING)
    public getLogsOutput(): Promise<string> {
        return stub();
    }
}
