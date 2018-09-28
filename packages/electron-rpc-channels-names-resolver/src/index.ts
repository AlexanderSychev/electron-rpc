import { ChannelsNamesParameters, RpcChannelDefaultNames, ChannelsNamesProperties } from 'electron-rpc-types';

/** Returns "true" if argument is "null" or "undefined" */
export const isNil = (value: any): value is null | undefined => value === null || value === undefined;

/** Resolves client channels parameters */
export const resolve = (params?: ChannelsNamesParameters | null | undefined): ChannelsNamesProperties => ({
    rpcRequestChannelName:
        isNil(params) || isNil(params.rpcRequestChannelName)
            ? RpcChannelDefaultNames.REQUEST
            : params.rpcRequestChannelName,
    rpcResponseChannelName:
        isNil(params) || isNil(params.rpcResponseChannelName)
            ? RpcChannelDefaultNames.RESPONSE
            : params.rpcResponseChannelName,
});
