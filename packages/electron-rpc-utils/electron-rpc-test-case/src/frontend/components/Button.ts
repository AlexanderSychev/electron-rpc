/** Button common */
export class Button {
    /** Button element */
    private element: HTMLButtonElement;
    constructor(buttonId: string) {
        this.element = <HTMLButtonElement>document.getElementById(buttonId);
    }
    public onClick(listener: () => any) {
        this.element.addEventListener('click', listener);
    }
}
