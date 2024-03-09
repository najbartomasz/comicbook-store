import { TestBed } from '@angular/core/testing';
import { LoggerMockFixture } from '../../../../test/fixtures/logger-mock/logger-mock.fixture';
import { LoggerFactoryService } from './logger-factory.service';
import { injectLogger } from './logger.injector';

describe('injectLogger', () => {
    test('creates logger', () => {
        // Given
        const loggerMockFixture = new LoggerMockFixture('TestLogger');
        const loggerMock = loggerMockFixture.logger;
        TestBed.configureTestingModule({
            providers: [
                { provide: LoggerFactoryService, useValue: loggerMockFixture.loggerFactory }
            ]
        });

        // When
        TestBed.runInInjectionContext(() => {
            const logger = injectLogger('TestLogger');

            // Then
            expect(logger).toBe(loggerMock);
        });
    });
});
