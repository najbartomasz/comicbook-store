
Object.defineProperty(HTMLDialogElement.prototype, 'show', {
    writable: true,
    value: function show(this: HTMLDialogElement) {
        this.open = true;
    }
});
Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
    writable: true,
    value: function showModal(this: HTMLDialogElement) {
        this.open = true;
    }
});
Object.defineProperty(HTMLDialogElement.prototype, 'close', {
    writable: true,
    value: function close(this: HTMLDialogElement) {
        this.open = false;
        this.dispatchEvent(new Event('close'));
    }
});
