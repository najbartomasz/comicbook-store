import { Element, Selector } from '@e2e/models';

export abstract class PageObject {
    protected get element(): Element { return this.createElement(); }

    public constructor(protected readonly parentSelector: Selector) { }

    protected abstract createElement(): Element;
}
