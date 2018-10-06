import { app, BrowserWindow, ipcMain } from 'electron';
import { Server, Client, Loggable } from 'electron-rpc-common';
import * as path from 'path';

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

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

const server = new Server(ipcMain, {
    nonblocking: async () => {
        await sleep(1000);
    },
    blocking: async () => {
        await sleep(1000);
    },
    foo: async () => {
        await sleep(500);
        return 'bar';
    },
    throwable: async () => {
        await sleep(500);
        throw new Error('Test error');
    },
    echo: async (message: string) => {
        return message;
    },
});

bindLogging(server);

let client: Client | null = null;
let win: BrowserWindow | null = null;

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 });
    client = new Client({ receiver: ipcMain, sender: win.webContents });
    bindLogging(client);
    server.start();
    const interval = async () => {
        const output = await client!.nonblocking<[], string>('getLogsOutput');
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
