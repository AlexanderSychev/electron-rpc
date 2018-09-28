import { ChannelsNamesParameters, ChannelsNamesProperties } from 'electron-rpc-types';
/** Returns "true" if argument is "null" or "undefined" */
export declare const isNil: (value: any) => value is null | undefined;
/** Resolves client channels parameters */
export declare const resolve: (params?: ChannelsNamesParameters | null | undefined) => ChannelsNamesProperties;
