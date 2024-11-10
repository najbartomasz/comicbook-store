import { Provider } from '@angular/core';
import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { LoggerFactory } from '@di/lib';
import { LoggerFixture } from '@testing/fixtures';

export const configureTestingModule = (testBed: TestBed, moduleDef?: TestModuleMetadata) => {
    const loggerFixture = new LoggerFixture();
    const { providers, ...moduleMetadata } = moduleDef ?? { providers: [] };
    testBed.configureTestingModule({
        ...moduleMetadata,
        providers: [
            { provide: LoggerFactory, useValue: loggerFixture.loggerFactoryMock },
            ...(providers ?? []) as Provider[]
        ]
    });
    return loggerFixture;
};
