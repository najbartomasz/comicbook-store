import { TestBed } from '@angular/core/testing';
import { LoggerFactory } from '@lib/logger';
import { injectLogger } from './logger.injector';

describe('injectLogger', () => {
    test('creates logger', () => {
        // Given
        const expectedLogger = new LoggerFactory().createLogger('TestLogger');

        // When
        const logger = TestBed.runInInjectionContext(() => injectLogger('TestLogger'));

        // Then
        expect(logger).toStrictEqual(expectedLogger);
    });
});
