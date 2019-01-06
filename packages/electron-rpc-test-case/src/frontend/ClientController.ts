import { Controller, Action } from 'electron-rpc-common';

import { Logs } from './components';

@Controller('Client')
export class ClientController {
    private logs: Logs;
    public constructor(logs: Logs) {
        this.logs = logs;
    }

    @Action('getLogsOutput')
    public getLogsOutput(): string {
        return this.logs.output;
    }
}
