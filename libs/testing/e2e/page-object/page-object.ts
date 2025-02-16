import { Element, Selector } from '../models';

export abstract class PageObject {
    protected get element(): Element { return this.createElement(); }

    public constructor(protected readonly parentSelector: Selector) { }

    protected abstract createElement(): Element;
}
