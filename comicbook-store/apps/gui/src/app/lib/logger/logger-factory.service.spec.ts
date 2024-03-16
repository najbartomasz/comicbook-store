import { TestBed } from '@angular/core/testing';
import { MockProxy, mock } from 'jest-mock-extended';
import * as consoleLogAppenderModule from './log-appender/console-log-appender';
import * as loggerModule from './logger';
import { LoggerFactoryService } from './logger-factory.service';

jest.mock('./log-appender/console-log-appender');

describe('LoggerFactoryService', () => {
    let loggerFactoryService: LoggerFactoryService;

    let consoleLogAppenderMock: MockProxy<consoleLogAppenderModule.ConsoleLogAppender>;

    beforeEach(() => {
        consoleLogAppenderMock = mock<consoleLogAppenderModule.ConsoleLogAppender>();
        jest.spyOn(consoleLogAppenderModule, 'ConsoleLogAppender').mockReturnValueOnce(consoleLogAppenderMock);

        loggerFactoryService = TestBed.inject(LoggerFactoryService);
    });

    test('creates logger new instance', () => {
        // Given
        const expectedLogger = new loggerModule.Logger('TestLogger', consoleLogAppenderMock);
        const loggerSpy = jest.spyOn(loggerModule, 'Logger').mockReturnValueOnce(expectedLogger);

        // When
        const logger = loggerFactoryService.createLogger('TestLogger');

        // Then
        expect(logger).toStrictEqual(expectedLogger);
        expect(loggerSpy).toHaveBeenCalledTimes(1);
        expect(loggerSpy).toHaveBeenCalledWith('TestLogger', consoleLogAppenderMock);
    });
});
