# electron-rpc-client

Electron RPC Client

## Installation

```bash
# By NPM
npm i electron-rpc-client --save
# Or by Yarn
yarn add electron-rpc-client --save
```

## API

### interface `ClientParameters` extends `ChannelsNamesParameters`
`Client` class constructor parameters object. Extends `ChannelsNamesParameters` interface (see "electron-rpc-types" README).

Fields:

* `receiver` (`IpcRenderer` for Render Process, `IpcMain` for Main Process) - messages receiver (listens);
/** Messages sender */
* `sender` (`IpcRenderer` for Render Process,  `WebContents` for Main Process);

### interface `RequestParams<A extends any[] = []>`
Parameters for `request` method of `Client` class.

Generic types:
* `A` - remote procedure arguments tuple;

Fields:

* `procedure` (`string`) - remote procedure name (`Resolver` object field name);
* `type` (optional, `EnvelopeType`) - type of request;
* `args` (optional, `A`, empty array by default) - remote procedure arguments;

### class `Client`
RCP Client service

#### `new Client(params: ClientParameters)`
Arguments:
* **`params`: `ClientParameters`** - client service parameters (see `ClientParameters`);

#### `Client.prototype.request<A extends any[] = any[], R = void>(params: RequestParams<A>): Promise<R>`
Common request sending method

Generic types:
* `A` (`any[]` by default) - remote procedure arguments tuple;
* `R` (`void` by default) - remote procedure result type;

Arguments:
* **`params`: `RequestParams<A>`** - request parameters

Returns `Promise` with remove procedure result.