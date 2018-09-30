import { ChannelsNamesParameters, RpcChannelDefaultNames, ChannelsNamesProperties } from 'electron-rpc-types';
import { isNil } from './isNil';

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
