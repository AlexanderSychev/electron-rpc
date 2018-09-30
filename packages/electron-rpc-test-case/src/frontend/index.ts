import { ipcRenderer } from 'electron';
import { Client } from 'electron-rpc';

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

class Logs {
    private element: HTMLTextAreaElement;
    constructor(id: string) {
        this.element = <HTMLTextAreaElement>document.getElementById(id);
    }
    public write(message: any) {
        this.element.value = `${this.element.value}${String(message)}\n`;
    }
}

function main() {
    const client = new Client({ receiver: ipcRenderer });

    const logs = new Logs('logs');

    const nonblocking = new Button('nonblocking');
    nonblocking.onClick(() => {
        client.nonblocking('nonblocking');
    });
    const blocking = new Button('blocking');
    blocking.onClick(() => {
        client.blocking('blocking');
    });
    const foo = new Button('foo');
    foo.onClick(() => {
        client.blocking<[], string>('foo').then(result => logs.write(result));
    });
    const echo = new Button('echo');
    echo.onClick(() => {
        client.nonblocking<[string], string>('echo', `Message #${Date.now()}`).then(result => logs.write(result));
    });
}

window.addEventListener('load', main);
