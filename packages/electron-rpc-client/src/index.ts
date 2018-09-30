import { EnvelopeType, Request, Response, ChannelsNamesParameters } from 'electron-rpc-types';
import { resolve, isNil } from 'electron-rpc-channels-names-resolver';
import { IpcRenderer } from 'electron';
import { v4 } from 'uuid';
import autobind from 'autobind-decorator';

/** Parameters for client */
export interface ClientParams {
    /** Name of Electron channel for RPC requests */
    rpcRequestChannelName?: string | null;
    /** Name of Electron channel for RPC responses */
    rpcResponseChannelName?: string | null;
}

/** Default request */
export interface RequestParams<A extends any[] = []> {
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
export class Client {
    /** Name of Electron channel for RPC requests */
    private rpcRequestChannelName: string;
    /** Name of Electron channel for RPC responses */
    private rpcResponseChannelName: string;
    /** IPC Renderer instance */
    private ipcRenderer: IpcRenderer;
    /** Map of response listeners */
    private listeners: ResponseListenersMap;
    /** @constructor */
    public constructor(ipcRenderer: IpcRenderer, params?: ChannelsNamesParameters | null | undefined) {
        const { rpcRequestChannelName, rpcResponseChannelName } = resolve(params);
        this.rpcRequestChannelName = rpcRequestChannelName;
        this.rpcResponseChannelName = rpcResponseChannelName;
        this.ipcRenderer = ipcRenderer;
        this.listeners = {};
        this.ipcRenderer.on(this.rpcResponseChannelName, this.onResponse);
    }
    /** Common request method */
    public request<A extends any[] = [], R = void>({ procedure, ...rest }: RequestParams<A>): Promise<R> {
        const uuid: string = v4();
        const type: EnvelopeType = isNil(rest.type) ? EnvelopeType.BLOCKING : rest.type!;
        const args: A = isNil(rest.args) ? <any>[] : rest.args;
        const request: Request<A> = { type, procedure, args, uuid };
        return new Promise<R>((resolve, reject) => {
            this.listeners[uuid] = ({ result, error }: Response<R>) => {
                if (!isNil(error)) {
                    reject(error);
                } else {
                    resolve(result!);
                }
            };
            this.ipcRenderer.send(this.rpcRequestChannelName, request);
        });
    }
    /** Nonblocking request method */
    public nonblocking<A extends any[] = [], R = void>(procedure: string, ...args: A): Promise<R> {
        return this.request<A, R>({ procedure, args, type: EnvelopeType.NONBLOCKING });
    }
    /** Blocking request method */
    public blocking<A extends any[] = [], R = void>(procedure: string, ...args: A): Promise<R> {
        return this.request<A, R>({ procedure, args, type: EnvelopeType.BLOCKING });
    }
    /** Common response event handler */
    @autobind
    protected onResponse(response: Response<any>): void {
        if (!isNil(this.listeners[response.uuid])) {
            this.listeners[response.uuid](response);
            delete this.listeners[response.uuid];
        }
    }
}
