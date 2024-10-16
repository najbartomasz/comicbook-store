import { Provider, Type } from '@angular/core';
import { LoggerFactory } from '@lib/logger/logger-factory.injection-token';
import { render, RenderComponentOptions } from '@testing-library/angular';
import { LoggerFixture } from '../logger/logger.fixture';

export const setupComponent = async <ComponentType>(component: Type<ComponentType>, options?: RenderComponentOptions<ComponentType>) => {
    const loggerFixture = new LoggerFixture();
    const providers = (options?.providers ?? []) as Provider[];
    const renderResults = await render(component, {
        ...options,
        providers: [
            { provide: LoggerFactory, useValue: loggerFixture.loggerFactoryMock },
            ...providers
        ]
    });
    renderResults.fixture.autoDetectChanges();
    return { ...renderResults, ...loggerFixture };
};
