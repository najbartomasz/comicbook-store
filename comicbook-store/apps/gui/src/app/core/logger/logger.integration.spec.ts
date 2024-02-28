/* eslint-disable no-console */
import { LoggerFactoryService } from './logger-factory.service';

describe('Logger', () => {
    test('prints messages on debug console', () => {
        // Given
        jest.spyOn(console, 'info').mockImplementationOnce(jest.fn());
        jest.spyOn(console, 'warn').mockImplementationOnce(jest.fn());
        jest.spyOn(console, 'error').mockImplementationOnce(jest.fn());
        const dateMock1 = new Date('2024-02-29T08:01:59.326Z');
        const dateMock2 = new Date('2024-02-29T08:02:14.430Z');
        const dateMock3 = new Date('2024-02-29T08:02:25.252Z');
        jest.spyOn(global, 'Date')
            .mockReturnValueOnce(dateMock1)
            .mockReturnValueOnce(dateMock2)
            .mockReturnValueOnce(dateMock3);
        const loggerFactoryService = new LoggerFactoryService();
        const logger1 = loggerFactoryService.createLogger('TestLogger1');
        const logger2 = loggerFactoryService.createLogger('TestLogger2');
        const logger3 = loggerFactoryService.createLogger('TestLogger3');

        // When
        logger1.info('First: test info message.');
        logger2.warn('Second: test warn message.');
        logger3.error('Third: test error message.', new Error('Test error.'));

        // Then
        expect(console.info).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.info).toHaveBeenCalledWith('2024-02-29T08:01:59.326Z TestLogger1 INFO: First: test info message.');
        expect(console.warn).toHaveBeenCalledWith('2024-02-29T08:02:14.430Z TestLogger2 WARN: Second: test warn message.');
        expect(console.error).toHaveBeenCalledWith(
            '2024-02-29T08:02:25.252Z TestLogger3 ERROR: Third: test error message. Caused by: Test error.'
        );
    });
});
