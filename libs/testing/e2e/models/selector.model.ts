import { Element } from './element.model';

export interface Selector {
    getBySelector(selector: string): Element;
}
