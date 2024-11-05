import { Provider } from '@angular/core';
import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { LoggerFixture } from '@test/fixtures/logger/logger.fixture';
import { LoggerFactory } from 'app/_dependency-injection/lib/logger/logger-factory.injection-token';

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
