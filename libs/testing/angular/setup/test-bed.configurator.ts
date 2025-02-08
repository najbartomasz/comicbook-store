import { Provider } from '@angular/core';
import { TestBed, TestModuleMetadata } from '@angular/core/testing';

export const configureTestingModule = (testBed: TestBed, moduleDef?: TestModuleMetadata) => {
    const { providers, ...moduleMetadata } = moduleDef ?? { providers: [] };
    testBed.configureTestingModule({
        ...moduleMetadata,
        providers: [
            ...(providers ?? []) as Provider[]
        ]
    });
};
