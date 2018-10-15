import {
    EnvelopeType,
    Request,
    Response,
    ChannelsNamesParameters,
    ChannelsNamesProperties,
    Envelope,
} from 'electron-rpc-types';
import { resolve, isNil, Loggable } from 'electron-rpc-utils';
import { IpcRenderer, WebContents, IpcMain, Event } from 'electron';
import { v4 } from 'uuid';
import autobind from 'autobind-decorator';

/** Parameters for client */
export interface ClientParameters extends ChannelsNamesParameters {
    /** Messages receiver */
    receiver: IpcRenderer | IpcMain;
    /** Messages sender */
    sender: IpcRenderer | WebContents;
}

/** Default request */
export interface RequestParams<A extends any[] = any[]> {
    /** Procedure params */
    procedure: string;
    /** Type of envelope ("EnvelopeType.WRITE" by default) */
    type?: EnvelopeType;
    /** Arguments (empty array by default) */
    args?: A;
}

/** Response listener */
interface ResponseListener {
    (response: Response<any>): any;
}

/** Response listeners map */
interface ResponseListenersMap {
    [uuid: string]: ResponseListener;
}

/** RPC Client */
export class Client extends Loggable {
    /** Name of Electron channel for RPC requests */
    private rpcRequestChannelName: string;
    /** Name of Electron channel for RPC responses */
    private rpcResponseChannelName: string;
    /** Map of response listeners */
    private listeners: ResponseListenersMap;
    /** Messages receiver */
    private receiver: IpcRenderer | IpcMain;
    /** Messages sender */
    private sender: IpcRenderer | WebContents;
    /** @constructor */
    public constructor({ receiver, sender, ...channelsNames }: ClientParameters) {
        super();
        const { rpcRequestChannelName, rpcResponseChannelName }: ChannelsNamesProperties = resolve(channelsNames);
        this.rpcRequestChannelName = rpcRequestChannelName;
        this.rpcResponseChannelName = rpcResponseChannelName;
        this.receiver = receiver;
        this.sender = sender;
        this.listeners = {};
        this.receiver.on(this.rpcResponseChannelName, this.onResponse);
    }
    /** Common request method */
    public request<A extends any[] = any[], R = any>({ procedure, ...rest }: RequestParams<A>): Promise<R> {
        const uuid: string = v4();
        const type: EnvelopeType = isNil(rest.type) ? EnvelopeType.BLOCKING : rest.type!;
        const args: A = isNil(rest.args) ? <any>[] : rest.args;
        const envelope: Envelope = { type, procedure, uuid };
        const request: Request<A> = { ...envelope, args };
        this.logRequest(envelope, args);
        return new Promise<R>((resolve, reject) => {
            this.listeners[uuid] = ({ result, error }: Response<R>) => {
                if (!isNil(error)) {
                    this.logError(envelope, args, error!);
                    reject(error);
                } else {
                    this.logSuccess(envelope, args, result!);
                    resolve(result!);
                }
            };
            this.sender.send(this.rpcRequestChannelName, request);
        });
    }
    /** Nonblocking request method */
    public nonblocking<A extends any[] = any[], R = any>(procedure: string, ...args: A): Promise<R> {
        return this.request<A, R>({ procedure, args, type: EnvelopeType.NONBLOCKING });
    }
    /** Blocking request method */
    public blocking<A extends any[] = any[], R = any>(procedure: string, ...args: A): Promise<R> {
        return this.request<A, R>({ procedure, args, type: EnvelopeType.BLOCKING });
    }
    /** Common response event handler */
    @autobind
    private onResponse(target: Event, response: Response<any>): void {
        if (!isNil(this.listeners[response.uuid])) {
            this.listeners[response.uuid](response);
            delete this.listeners[response.uuid];
        }
    }
}

declare global {
    /** RPC Client */
    interface ClientConstructor {
        new (params: ClientParameters): Client;
    }
    interface ElectronRPCGlobal {
        Client: ClientConstructor;
    }
    interface Window {
        ElectronRPC: ElectronRPCGlobal;
    }
}
