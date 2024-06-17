import { Logger, LoggerFactory } from '@comicbook-store/logger';
import { mock } from 'jest-mock-extended';

export class LoggerMockFixture {
    public readonly loggerFactoryMock = mock<LoggerFactory>();
    public readonly loggerMock = mock<Logger>();

    public constructor(loggerName?: string) {
        if (loggerName) {
            this.loggerFactoryMock.createLogger.calledWith(loggerName).mockReturnValueOnce(this.loggerMock);
        } else {
            this.loggerFactoryMock.createLogger.mockReturnValue(this.loggerMock);
        }
    }
}
