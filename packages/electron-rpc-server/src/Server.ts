import autobind from 'autobind-decorator';
import { Event, IpcMain } from 'electron';
import { Resolver, ChannelsNamesParameters, Request, EnvelopeType, Response } from 'electron-rpc-types';
import { resolve, isNil } from 'electron-rpc-channels-names-resolver';
import { TaskQueue } from './TaskQueue';

/** Electron RPC Server */
export class Server {
    /** RPC resolver */
    private resolver: Resolver;
    /** Request IPC channel name */
    private rpcRequestChannelName: string;
    /** Response IPC channel name */
    private rpcResponseChannelName: string;
    /** Blocking requests queue */
    private queue: TaskQueue;
    /** Main process IPC bus */
    private ipcMain: IpcMain;
    /** @constructor */
    public constructor(ipcMain: IpcMain, resolver: Resolver, channels?: ChannelsNamesParameters | null | undefined) {
        const { rpcRequestChannelName, rpcResponseChannelName } = resolve(channels);
        this.rpcRequestChannelName = rpcRequestChannelName;
        this.rpcResponseChannelName = rpcResponseChannelName;
        this.resolver = resolver;
        this.ipcMain = ipcMain;
        this.queue = new TaskQueue();
    }
    /** Start server */
    public start(): void {
        this.ipcMain.on(this.rpcRequestChannelName, this.onRequest);
    }
    /** Stop server */
    public stop(): void {
        this.ipcMain.removeListener(this.rpcRequestChannelName, this.onRequest);
    }
    /** Common requests handler */
    @autobind
    protected async onRequest(event: Event, { type, ...rest }: Request): Promise<void> {
        switch (type) {
            case EnvelopeType.NONBLOCKING: {
                await this.onNonblockingRequest(event, { type, ...rest });
                break;
            }
            case EnvelopeType.BLOCKING:
            default: {
                await this.onBlockingRequest(event, { type, ...rest });
                break;
            }
        }
    }
    /** Unblocking requests handler */
    protected async onNonblockingRequest(event: Event, request: Request): Promise<void> {
        await this.processRequest(event, request);
    }
    /** Blocking requests handler */
    protected async onBlockingRequest(event: Event, request: Request): Promise<void> {
        this.queue.push(async (): Promise<void> => this.processRequest(event, request));
    }
    /** Common process requestor */
    protected async processRequest({ sender }: Event, { uuid, type, procedure, args }: Request): Promise<void> {
        const response: Response = {
            uuid,
            type,
            procedure,
            error: null,
            result: null,
        };
        if (isNil(this.resolver[procedure])) {
            response.error = `Procedure "${procedure}" not found`;
        } else {
            try {
                response.result = await this.resolver[procedure](...args);
            } catch (error) {
                response.error = String(error);
            }
            sender.send(this.rpcResponseChannelName, response);
        }
    }
}
