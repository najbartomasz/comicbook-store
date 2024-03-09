import { TestBed } from '@angular/core/testing';
import { MockProxy, mock } from 'jest-mock-extended';
import { ConsoleLogAppenderService } from './log-appender/console-log-appender.service';
import * as loggerModule from './logger';
import { LoggerFactoryService } from './logger-factory.service';

describe('LoggerFactoryService', () => {
    let loggerFactoryService: LoggerFactoryService;

    let consoleLogAppenderMock: MockProxy<ConsoleLogAppenderService>;

    beforeEach(() => {
        consoleLogAppenderMock = mock<ConsoleLogAppenderService>();

        TestBed.configureTestingModule({
            providers: [
                { provide: ConsoleLogAppenderService, useValue: consoleLogAppenderMock }
            ]
        });
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
