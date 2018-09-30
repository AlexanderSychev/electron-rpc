import autobind from 'autobind-decorator';
import { Event, IpcMain, IpcRenderer } from 'electron';
import { Resolver, ChannelsNamesParameters, Request, EnvelopeType, Response } from 'electron-rpc-types';
import { resolve, isNil } from 'electron-rpc-channels-names-resolver';

import { TaskQueue } from './task/TaskQueue';

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
    private bus: IpcMain | IpcRenderer;
    /** @constructor */
    public constructor(
        bus: IpcMain | IpcRenderer,
        resolver: Resolver,
        channels?: ChannelsNamesParameters | null | undefined,
    ) {
        const { rpcRequestChannelName, rpcResponseChannelName } = resolve(channels);
        this.rpcRequestChannelName = rpcRequestChannelName;
        this.rpcResponseChannelName = rpcResponseChannelName;
        this.resolver = resolver;
        this.bus = bus;
        this.queue = new TaskQueue();
    }
    /** Start server */
    public start(): void {
        this.bus.on(this.rpcRequestChannelName, this.onRequest);
    }
    /** Stop server */
    public stop(): void {
        this.bus.removeListener(this.rpcRequestChannelName, this.onRequest);
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
        this.queue.push(this.processRequest, event, request);
    }
    /** Common process requestor */
    @autobind
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
