import { app, BrowserWindow, ipcMain } from 'electron';
import { Server, Client } from 'electron-rpc';
import * as path from 'path';

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

const server = new Server(ipcMain, {
    nonblocking: async () => {
        console.log('nonblocking started');
        await sleep(1000);
        console.log('nonblocking done');
    },
    blocking: async () => {
        console.log('blocking started');
        await sleep(1000);
        console.log('blocking done');
    },
    foo: async () => {
        console.log('withResult');
        await sleep(500);
        return 'bar';
    },
    echo: async (message: string) => {
        console.log(`echo ${message}`);
        return message;
    },
});

let client: Client | null = null;
let win: BrowserWindow | null = null;

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 });
    client = new Client({ receiver: ipcMain, sender: win.webContents });
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
