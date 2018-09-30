import { ipcRenderer } from 'electron';
import * as ElectronRPC from 'electron-rpc';

/** Button common */
class Button {
    /** Button element */
    private element: HTMLButtonElement;
    constructor(buttonId: string) {
        this.element = <HTMLButtonElement>document.getElementById(buttonId);
    }
    public onClick(listener: () => any) {
        this.element.addEventListener('click', listener);
    }
}

function main() {
    const client = new ElectronRPC.Client({ receiver: ipcRenderer });

    const nonblocking = new Button('nonblocking');
    nonblocking.onClick(() => {
        client.nonblocking('nonblocking');
    });
    const blocking = new Button('blocking');
    blocking.onClick(() => {
        client.nonblocking('blocking');
    });
}

window.addEventListener('load', main);
