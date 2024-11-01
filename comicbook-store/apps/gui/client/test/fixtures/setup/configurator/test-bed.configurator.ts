import { Provider } from '@angular/core';
import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { LoggerFactory } from '@lib/logger/logger-factory.injection-token';
import { LoggerFixture } from '@test/fixtures/logger/logger.fixture';

export const configureTestingModule = (testBed: TestBed, moduleDef?: TestModuleMetadata) => {
    const loggerFixture = new LoggerFixture();
    const { providers, ...moduleMetadata } = moduleDef ?? { providers: [] };
    testBed.configureTestingModule({
        ...moduleMetadata,
        providers: [
            { provide: LoggerFactory, useValue: loggerFixture.loggerFactoryMock },
            ...(providers ?? []) as Provider[]
        ],
        teardown: {
            destroyAfterEach: true
        }
    });
    return loggerFixture;
};
