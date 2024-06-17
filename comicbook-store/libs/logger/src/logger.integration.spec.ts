/* eslint-disable no-console */
import { LoggerFactory } from '.';

describe('Logger', () => {
    test('prints messages on debug console', () => {
        // Given
        jest.spyOn(console, 'info').mockImplementationOnce(jest.fn());
        jest.spyOn(console, 'warn').mockImplementationOnce(jest.fn());
        jest.spyOn(console, 'error').mockImplementationOnce(jest.fn());
        const loggerFactory = new LoggerFactory();
        const logger1 = loggerFactory.createLogger('TestLogger1');
        const logger2 = loggerFactory.createLogger('TestLogger2');
        const logger3 = loggerFactory.createLogger('TestLogger3');

        // When
        jest.setSystemTime(new Date('2024-02-29T08:01:59.326Z'));
        logger1.info('First: test info message.');
        jest.setSystemTime(new Date('2024-02-29T08:02:14.430Z'));
        logger2.warn('Second: test warn message.');
        jest.setSystemTime(new Date('2024-02-29T08:02:25.252Z'));
        logger3.error('Third: test error message.', new Error('Test error.'));

        // Then
        expect(console.info).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.info).toHaveBeenCalledWith('2024-02-29T08:01:59.326Z TestLogger1 INFO: First: test info message.');
        expect(console.warn).toHaveBeenCalledWith('2024-02-29T08:02:14.430Z TestLogger2 WARN: Second: test warn message.');
        expect(console.error).toHaveBeenCalledWith('2024-02-29T08:02:25.252Z TestLogger3 ERROR: Third: test error message.', 'Test error.');
    });
});
