export class Logs {
    private element: HTMLTextAreaElement;
    constructor(id: string) {
        this.element = <HTMLTextAreaElement>document.getElementById(id);
    }
    public get output(): string {
        return this.element.value;
    }
    public write(message: any) {
        this.element.value = `${this.output}${String(message)}\n`;
    }
}
