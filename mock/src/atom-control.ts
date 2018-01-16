namespace WebAtoms {
    export class AtomControl {

        _element: HTMLElement;

        constructor(e:HTMLElement) {
            this._element = e;
        }

        init():void {
            console.log("init");
        }
    }
}