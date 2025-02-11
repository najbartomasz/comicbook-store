export interface Verifier {
    toHaveScreenshot(name: string): Promise<void>;
}
