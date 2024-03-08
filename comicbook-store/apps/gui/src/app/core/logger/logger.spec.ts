import { MockProxy, mock } from 'jest-mock-extended';
import { LogAppender } from './log-appender/log-appender.model';
import { Logger } from './logger';

describe('Logger', () => {
    let logger: Logger;

    let logAppender1Mock: MockProxy<LogAppender>;
    let logAppender2Mock: MockProxy<LogAppender>;

    beforeEach(() => {
        const dateMock = new Date('2024-02-28T09:21:06.090Z');
        jest.spyOn(global, 'Date').mockReturnValueOnce(dateMock);

        logAppender1Mock = mock<LogAppender>();
        logAppender2Mock = mock<LogAppender>();
        logger = new Logger('TestLogger', [logAppender1Mock, logAppender2Mock]);
    });

    test('triggers log appenders info', () => {
        // Given, When
        logger.info('Test info message.');

        // Then
        expect(logAppender1Mock.info).toHaveBeenCalledTimes(1);
        expect(logAppender1Mock.info).toHaveBeenCalledWith(
            { timestamp: '2024-02-28T09:21:06.090Z', loggerName: 'TestLogger', message: 'Test info message.' }
        );
        expect(logAppender2Mock.info).toHaveBeenCalledTimes(1);
        expect(logAppender2Mock.info).toHaveBeenCalledWith(
            { timestamp: '2024-02-28T09:21:06.090Z', loggerName: 'TestLogger', message: 'Test info message.' }
        );
    });

    test('triggers console log appender warn', () => {
        // Given, When
        logger.warn('Test warn message.');

        // Then
        expect(logAppender1Mock.warn).toHaveBeenCalledTimes(1);
        expect(logAppender1Mock.warn).toHaveBeenCalledWith(
            { timestamp: '2024-02-28T09:21:06.090Z', loggerName: 'TestLogger', message: 'Test warn message.' }
        );
        expect(logAppender2Mock.warn).toHaveBeenCalledTimes(1);
        expect(logAppender2Mock.warn).toHaveBeenCalledWith(
            { timestamp: '2024-02-28T09:21:06.090Z', loggerName: 'TestLogger', message: 'Test warn message.' }
        );
    });

    test('triggers console log appender error', () => {
        // Given
        const error = new Error('Test error.');

        // When
        logger.error('Test error message.', error);

        // Then
        expect(logAppender1Mock.error).toHaveBeenCalledTimes(1);
        expect(logAppender1Mock.error).toHaveBeenCalledWith(
            { timestamp: '2024-02-28T09:21:06.090Z', loggerName: 'TestLogger', message: 'Test error message.', error }
        );
        expect(logAppender2Mock.error).toHaveBeenCalledTimes(1);
        expect(logAppender2Mock.error).toHaveBeenCalledWith(
            { timestamp: '2024-02-28T09:21:06.090Z', loggerName: 'TestLogger', message: 'Test error message.', error }
        );
    });
});
