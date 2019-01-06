import { Controller, Action } from 'electron-rpc-common';

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

@Controller('Main')
export class MainController {
    @Action()
    public async nonblocking(): Promise<void> {
        await sleep(1000);
    }
    @Action()
    public async blocking(): Promise<void> {
        await sleep(1000);
    }
    @Action()
    public async foo(): Promise<string> {
        await sleep(500);
        return 'bar';
    }
    @Action()
    public async throwable(): Promise<void> {
        await sleep(500);
        throw new Error('Test error');
    }
    @Action()
    public async echo(message: string): Promise<string> {
        return message;
    }
}
