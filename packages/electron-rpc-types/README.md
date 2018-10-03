# electron-rpc-types

Common types for Electron RPC packages.

# Types

## interface `Resolver`
Dictionary of functions which can receive receive any arguments and returns any values:
```typescript
import { Resolver } from 'electron-rpc-types';

import { User, UserUseCases } from './layers/domain';

const userUseCases: UserUseCases = new UserUseCases();

const resolver: Resolver = {
    getUser: async (id: string): Promise<User> => userUseCases.getUser(id),
    removeUser: async (id: string): Promise<User> => userUseCases.removeUser(id),
    createUser: async (name: string, password?: string): Promise<User> => userUseCases.createUser(name, password),
    updateUser: async (id: string, name: string, password?: string): Promise<User> => userUseCases.updateUser(
        id,
        name,
        password
    ),
};
```

## const enum `RpcChannelDefaultNames`
Default Electron IPC responses and requests channels names. Constant enumeration for TypeScript code, will be replaced to constant values after compilation. In JavaScript you can require enumeration object.

Values:

* `REQUEST` (equals `"RpcChannelDefaultNames.REQUEST"`) - request IPC channel default name;
* `RESPONSE` (equals `"RpcChannelDefaultNames.RESPONSE"`) - request IPC channel default name;

### Examples

**TypeScript:**
```typescript
import { RpcChannelDefaultNames } from 'electron-rpc-types';

const DEFAULT_REQUEST_CHANNEL_NAME: string = RpcChannelDefaultNames.REQUEST; // Will be replaced to "RpcChannelDefaultNames.REQUEST" string

const DEFAULT_RESPONSE_CHANNEL_NAME: string = RpcChannelDefaultNames.RESPONSE; // Will be replaced to "RpcChannelDefaultNames.RESPONSE" string
```

**JavaScript:**
```javascript
'use strict';

const { RpcChannelDefaultNames } = require('electron-rpc-types');

// Real JS object required, no replacements
const DEFAULT_REQUEST_CHANNEL_NAME = RpcChannelDefaultNames.REQUEST;
const DEFAULT_RESPONSE_CHANNEL_NAME = RpcChannelDefaultNames.RESPONSE;
```

## const enum `EnvelopeType`
Available RPC messages (envelopes) types. Constant enumeration for TypeScript code, will be replaced to constant values after compilation. In JavaScript you can require enumeration object.

Values:

* `NONBLOCKING` (equals `"EnvelopeType.NONBLOCKING"`) - nonblocking (several requests of this type may be executed in parallel);
* `BLOCKING` (equals `"EnvelopeType.BLOCKING"`) - blocking (several requests of this type will be executed only in turn);

### Examples

**TypeScript:**
```typescript
import { EnvelopeType } from 'electron-rpc-types';

const NONBLOCKING: string = EnvelopeType.NONBLOCKING; // Will be replaced to "EnvelopeType.NONBLOCKING" string

const BLOCKING: string = EnvelopeType.BLOCKING; // Will be replaced to "EnvelopeType.BLOCKING" string
```

**JavaScript:**
```javascript
'use strict';

const { EnvelopeType } = require('electron-rpc-types');

const NONBLOCKING = EnvelopeType.NONBLOCKING; // Will be replaced to "EnvelopeType.NONBLOCKING" string

const BLOCKING = EnvelopeType.BLOCKING; // Will be replaced to "EnvelopeType.BLOCKING" string
```

## interface `ChannelsNamesParameters`
Request and response IPC channels names parameters - all fields are optional, and will be automatically resolved by `resolve` function at `electron-rpc-channels-names-resolver` package.

Fields:

* `rpcRequestChannelName` (optional, `string` or `null` or `undefined`) - name of Electron channel for RPC requests;
* `rpcResponseChannelName` (optional, `string` or `null` or `undefined`) - name of Electron channel for RPC responses;

## interface `ChannelsNamesProperties`
Resolved version of `ChannelsNamesParameters` - all fields are exists and they are a strings.

Fields:

* `rpcRequestChannelName` (required, `string`) - name of Electron channel for RPC requests;
* `rpcResponseChannelName` (required, `string`) - name of Electron channel for RPC responses;

## interface `Envelope`
Common signature for RPC requests and responses.

Fields:
* `uuid` (`string`) - envelope unique identifier (UUID v4);
* `type` (`EnvelopeType`) - envelope type (see `EnvelopeType` enum description);
* `procedure` (`string`) - name of procedure;

## interface `interface Request<A extends any[] = []>` extends `Envelope`
RPC request signature, extends `Envelope` interface.

Generic arguments:
* `A` (extends `any[]`, `[]` by default) - arguments tuple signature;

Fields:
* `args` (`A`) - array of arguments for remote procedure;

## interface `Response<R = void>` extends `Envelope`
RPC response signature, extends `Envelope` interface.

Generic arguments:
* `R` (`void` by default) - remote procedure result signature;

Fields:
* `result` (`R` or `null` or `undefined`) - remote procedure result;
* `error` (`string` or `null` or `undefined`) - remote procedure error message;
