import autobind from 'autobind-decorator';
import { ipcMain, Event } from 'electron';
import { Resolver, ChannelsNamesParameters, Request } from 'electron-rpc-types';
import { resolve } from 'electron-rpc-channels-names-resolver';

/** Electron RPC Server */
export class Server {
    /** RPC resolver */
    private resolver: Resolver;
    /** Request IPC channel name */
    private rpcRequestChannelName: string;
    /** Response IPC channel name */
    private rpcResponseChannelName: string;
    /** @constructor */
    public constructor(resolver: Resolver, channels?: ChannelsNamesParameters | null | undefined) {
        const { rpcRequestChannelName, rpcResponseChannelName } = resolve(channels);
        this.rpcRequestChannelName = rpcRequestChannelName;
        this.rpcResponseChannelName = rpcResponseChannelName;
        this.resolver = resolver;
    }
    /** */
    public listen(): void {
        ipcMain.on(this.rpcRequestChannelName, this.onRequest);
    }
    @autobind
    protected async onRequest(event: Event, { uuid, type, procedure, args }: Request): Promise<void> {
        const result = await this.resolver[procedure](...args);
        event.sender.send(this.rpcResponseChannelName, result);
    }
}
