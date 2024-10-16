import { Provider } from '@angular/core';
import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { LoggerFactory } from '@lib/logger/logger-factory.injection-token';
import { LoggerFixture } from '../logger/logger.fixture';

export const setupModule = (moduleDef?: TestModuleMetadata) => {
    const loggerFixture = new LoggerFixture();
    const providers = (moduleDef?.providers ?? []) as Provider[];
    TestBed.configureTestingModule({
        ...moduleDef,
        providers: [
            { provide: LoggerFactory, useValue: loggerFixture.loggerFactoryMock },
            ...providers
        ]
    });
    return { ...loggerFixture };
};
