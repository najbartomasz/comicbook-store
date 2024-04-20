import { MockProxy, mock } from 'jest-mock-extended';
import { LoggerFactory, Logger } from '@lib/logger';

export class LoggerMockFixture {
    public loggerFactoryMock: MockProxy<LoggerFactory>;
    public loggerMock: MockProxy<Logger>;

    public constructor(loggerName?: string) {
        this.loggerFactoryMock = mock<LoggerFactory>();
        this.loggerMock = mock<Logger>();
        if (loggerName) {
            this.loggerFactoryMock.createLogger
                .calledWith(loggerName)
                .mockReturnValueOnce(this.loggerMock);
        } else {
            this.loggerFactoryMock.createLogger.mockReturnValue(this.loggerMock);
        }
    }

    public static get loggerFactory(): MockProxy<LoggerFactory> {
        return new LoggerMockFixture().loggerFactoryMock;
    }
}
