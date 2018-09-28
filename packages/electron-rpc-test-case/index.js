'use strict'

const { app, BrowserWindow, ipcMain } = require('electron');
const { Server } = require('electron-rpc-server');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
    }
});

let win;

function createWindow () {
    win = new BrowserWindow({ width: 800, height: 600 });
    server.start();

    win.loadFile('index.html');

    win.webContents.openDevTools();

    win.on('closed', () => {
        server.stop();
        win = null;
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
})
