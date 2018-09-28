window.addEventListener('load', () => {
    const { ipcRenderer } = require('electron');

    const client = new ElectronRPC.Client(ipcRenderer);

    const nonblocking = document.getElementById('nonblocking');
    nonblocking.addEventListener('click', () => {
        client.nonblocking('nonblocking', []);
    });

    const blocking = document.getElementById('blocking');
    blocking.addEventListener('click', () => {
        client.blocking('blocking', []);
    });
});
