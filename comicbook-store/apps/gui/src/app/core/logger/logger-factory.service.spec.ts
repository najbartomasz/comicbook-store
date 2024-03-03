import { LoggerFactoryService } from './logger-factory.service';
import * as loggerModule from './logger';

describe('LoggerFactoryService', () => {
    test('creates logger new instance', () => {
        // Given
        const loggerMock = loggerModule.createLogger('TestLogger');
        jest.spyOn(loggerModule, 'createLogger').mockReturnValueOnce(loggerMock);
        const loggerFactoryService = new LoggerFactoryService();

        // When
        const logger = loggerFactoryService.createLogger('TestLogger');

        // Then
        expect(logger).toBe(loggerMock);
    });
});
