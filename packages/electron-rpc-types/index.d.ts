/** Common RPC incoming envelopes resolver */
export interface Resolver {
    [name: string]: (...args: any[]) => any;
}

/** Default names of RPC channel */
export const enum RpcChannelDefaultNames {
    /** Request channel default name */
    REQUEST = 'RpcChannelDefaultNames.REQUEST',
    /** Response channel default name */
    RESPONSE = 'RpcChannelDefaultNames.RESPONSE'
}

/** Type of envelope */
export const enum EnvelopeType {
    /** Nonblocking (several requests of this type may be executed in parallel) */
    NONBLOCKING = 'EnvelopeType.NONBLOCKING',
    /** Blocking (several requests of this type will be executed only in turn) */
    BLOCKING = 'EnvelopeType.BLOCKING'
}

/** IPC channels names parameters signature */
export interface ChannelsNamesParameters {
    /** Name of Electron channel for RPC requests */
    rpcRequestChannelName?: string | null | undefined;
    /** Name of Electron channel for RPC responses */
    rpcResponseChannelName?: string | null | undefined;
}

/** IPC channels names properties (completely resolved "ChannelsNamesParameters") */
export interface ChannelsNamesProperties {
    /** Name of Electron channel for RPC requests */
    rpcRequestChannelName: string;
    /** Name of Electron channel for RPC responses */
    rpcResponseChannelName: string;
}

/** Envelope */
export interface Envelope {
    /** Envelope unique identifier (UUID v4) */
    uuid: string;
    /** Envelope type */
    type: EnvelopeType;
    /** Name of procedure */
    procedure: string;
}

/** Request */
export interface Request<A extends any[] = []> extends Envelope {
    /** Arguments for remote procedure */
    args: A;
}

/** Response */
export interface Response<R = void> extends Envelope {
    /** Response result */
    result: R | null | undefined;
    /** Response error */
    error: string | null | undefined;
}
