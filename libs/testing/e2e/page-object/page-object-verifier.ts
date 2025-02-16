import { Verifier } from '../models';

export class PageObjectVerifier {
    public constructor(protected readonly element: Verifier) { }

    public async toHaveScreenshot(name: string): Promise<void> {
        await this.element.toHaveScreenshot(name);
    }
}
