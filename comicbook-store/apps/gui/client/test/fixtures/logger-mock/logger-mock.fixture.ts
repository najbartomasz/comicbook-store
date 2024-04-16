import { MockProxy, mock } from 'jest-mock-extended';
import { LoggerFactoryService, Logger } from '@lib/logger';

export class LoggerMockFixture {
    public loggerFactoryMock: MockProxy<LoggerFactoryService>;
    public loggerMock: MockProxy<Logger>;

    public constructor(loggerName?: string) {
        this.loggerFactoryMock = mock<LoggerFactoryService>();
        this.loggerMock = mock<Logger>();
        if (loggerName) {
            this.loggerFactoryMock.createLogger
                .calledWith(loggerName)
                .mockReturnValueOnce(this.loggerMock);
        } else {
            this.loggerFactoryMock.createLogger.mockReturnValue(this.loggerMock);
        }
    }

    public static get loggerFactory(): MockProxy<LoggerFactoryService> {
        return new LoggerMockFixture().loggerFactoryMock;
    }
}
