import autobind from 'autobind-decorator';
import { Event, IpcMain, IpcRenderer } from 'electron';
import { Resolver, ChannelsNamesParameters, Request, EnvelopeType, Response } from 'electron-rpc-types';
import { resolve, isNil, Loggable } from 'electron-rpc-utils';
import { AsyncQueue } from 'electron-rpc-async-queue';

/** Electron RPC Server */
export class Server extends Loggable {
    /** RPC resolver */
    private resolver: Resolver;
    /** Request IPC channel name */
    private rpcRequestChannelName: string;
    /** Response IPC channel name */
    private rpcResponseChannelName: string;
    /** Blocking requests queue */
    private queue: AsyncQueue;
    /** Main process IPC bus */
    private bus: IpcMain | IpcRenderer;
    /** @constructor */
    public constructor(
        bus: IpcMain | IpcRenderer,
        resolver: Resolver,
        channels?: ChannelsNamesParameters | null | undefined,
    ) {
        super();
        const { rpcRequestChannelName, rpcResponseChannelName } = resolve(channels);
        this.rpcRequestChannelName = rpcRequestChannelName;
        this.rpcResponseChannelName = rpcResponseChannelName;
        this.resolver = resolver;
        this.bus = bus;
        this.queue = new AsyncQueue();
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
    private async onRequest(event: Event, { type, procedure, uuid, ...rest }: Request): Promise<void> {
        this.logRequest({ type, procedure, uuid }, rest.args);
        switch (type) {
            case EnvelopeType.NONBLOCKING: {
                await this.onNonblockingRequest(event, { type, procedure, uuid, ...rest });
                break;
            }
            case EnvelopeType.BLOCKING:
            default: {
                await this.onBlockingRequest(event, { type, procedure, uuid, ...rest });
                break;
            }
        }
    }
    /** Unblocking requests handler */
    private async onNonblockingRequest(event: Event, request: Request): Promise<void> {
        await this.processRequest(event, request);
    }
    /** Blocking requests handler */
    private async onBlockingRequest(event: Event, request: Request): Promise<void> {
        this.queue.push(this.processRequest, event, request);
    }
    /** Common process requestor */
    @autobind
    private async processRequest({ sender }: Event, { uuid, type, procedure, args }: Request): Promise<void> {
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
                this.logSuccess({ uuid, type, procedure }, args, response.result);
            } catch (error) {
                response.error = String(error);
                this.logError({ uuid, type, procedure }, args, response.error);
            }
            sender.send(this.rpcResponseChannelName, response);
        }
    }
}
