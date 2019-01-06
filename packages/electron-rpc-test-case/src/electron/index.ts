/* tslint:disable:no-console */

import 'reflect-metadata';
import { app, BrowserWindow, ipcMain } from 'electron';
import { Server, Client, Loggable, bindControllersToServer, Factory } from 'electron-rpc-common';
import * as path from 'path';

import { MainController } from './MainController';
import { ClientService } from './ClientService';

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

function unbindLogging(loggable: Loggable): void {
    loggable.setRequestLogger(null);
    loggable.setSuccessLogger(null);
    loggable.setErrorLogger(null);
}

const server = new Server(ipcMain);
bindControllersToServer(server, [MainController]);

bindLogging(server);

let client: Client | null = null;
let factory: Factory | null = null;
let clientService: ClientService | null = null;
let win: BrowserWindow | null = null;

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 });
    client = new Client({ receiver: ipcMain, sender: win.webContents });
    factory = new Factory(client);
    clientService = factory.createService(ClientService);
    bindLogging(client);
    server.start();
    const interval = async () => {
        const output = await clientService!.getLogsOutput();
        const date = new Date();
        console.log(`LOGS OUTPUT AT ${date.toISOString()}\n\n${output}`);
    };
    const triggerId = setInterval(interval, 1000);

    win.loadFile(path.resolve(__dirname, '../frontend/index.html'));

    win.webContents.openDevTools();

    win.on('closed', () => {
        server.stop();
        clearInterval(triggerId);
        win = null;
        unbindLogging(client!);
        client = null;
        clientService = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
