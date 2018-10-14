import { Service, Procedure, stub, EnvelopeType } from 'electron-rpc-common';

@Service('Main')
export class MainService {
    @Procedure('nonblocking', EnvelopeType.NONBLOCKING)
    public nonblocking(): Promise<void> {
        return stub();
    }
    @Procedure('blocking', EnvelopeType.BLOCKING)
    public blocking(): Promise<void> {
        return stub();
    }
    @Procedure('foo', EnvelopeType.BLOCKING)
    public foo(): Promise<string> {
        return stub();
    }
    @Procedure('throwable', EnvelopeType.NONBLOCKING)
    public throwable(): Promise<void> {
        return stub();
    }
    @Procedure('echo', EnvelopeType.NONBLOCKING)
    public echo(message: string): Promise<string> {
        return stub(message);
    }
}
