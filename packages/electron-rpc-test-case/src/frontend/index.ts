import { ipcRenderer } from 'electron';
import { Client, Server, Loggable, bindControllersToServer, Factory } from 'electron-rpc-common';

import { Button, Logs } from './components';
import { ClientController } from './ClientController';
import { MainService } from './MainService';

function bindLogging(loggable: Loggable): void {
    loggable.setRequestLogger(({ uuid, procedure }, args) => {
        console.log(`[REQUEST] ENVELOPE #${uuid}: "${procedure}"(${args.join(', ')})`);
    });
    loggable.setSuccessLogger(({ uuid, procedure }, args, result) => {
        console.log(`[SUCCESS] ENVELOPE #${uuid} "${procedure}"(${args.join(', ')}) => ${result}`);
    });
    loggable.setErrorLogger(({ uuid, procedure }, args, error) => {
        console.log(`[ERROR] ENVELOPE #${uuid} "${procedure}"(${args.join(', ')}) => ${error}`);
    });
}

function main() {
    const client = new Client({ receiver: ipcRenderer, sender: ipcRenderer });
    const factory = new Factory(client);
    const mainService: MainService = factory.createService(MainService);
    bindLogging(client);

    const logs = new Logs('logs');

    const nonblocking = new Button('nonblocking');
    nonblocking.onClick(() => {
        mainService.nonblocking();
    });
    const blocking = new Button('blocking');
    blocking.onClick(() => {
        mainService.blocking();
    });
    const foo = new Button('foo');
    foo.onClick(() => {
        mainService.foo().then(result => logs.write(result));
    });
    const echo = new Button('echo');
    echo.onClick(() => {
        mainService.echo(`Message #${Date.now()}`).then(result => logs.write(result));
    });
    const throwable = new Button('throwable');
    throwable.onClick(() => {
        mainService.throwable();
    });

    const server = new Server(ipcRenderer);
    bindLogging(server);
    bindControllersToServer(server, [[ClientController, logs]]);
    server.start();
}

window.addEventListener('load', main);
