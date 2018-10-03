# "electron-rpc-channels-names-resolver"

Utilities package for Electron RPC.

# API

## isNil(value: any): boolean
Arguments:
* `value` (any type) - value to check;

Returns `true` if `value` is `null` or `undefined`. For any other values always returns `true`

## resolve(params?: ChannelsNamesParameters | null | undefined): ChannelsNamesProperties
Arguments:
* `params` (optional, `ChannelsNamesParameters` or `null` or `undefined`) - parameters object to resolve (see `ChannelsNamesParameters` at "electron-rpc-types" README);

Returns resolved RPC request and response channels names properties.

# Browser usage

Use bundle `lib/electron-rpc-channels-names-resolver.min.js` at package directory. All API functions stored at `ElectronRPC` global variable.
