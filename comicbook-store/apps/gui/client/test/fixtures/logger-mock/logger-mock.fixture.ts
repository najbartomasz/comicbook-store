import { Logger, LoggerFactory } from '@comicbook-store/logger';
import { mock } from 'jest-mock-extended';

interface LoggerMockOptions {
    returnTimes: 'once' | 'every';
}

export class LoggerMockFixture {
    public readonly loggerFactoryMock = mock<LoggerFactory>();
    public readonly loggerMock = mock<Logger>();

    public constructor(loggerName?: string, options: LoggerMockOptions = { returnTimes: 'once' }) {
        if (loggerName) {
            if (options.returnTimes === 'once') {
                this.loggerFactoryMock.createLogger.calledWith(loggerName).mockReturnValueOnce(this.loggerMock);
            } else {
                this.loggerFactoryMock.createLogger.calledWith(loggerName).mockReturnValue(this.loggerMock);
            }
        } else {
            this.loggerFactoryMock.createLogger.mockReturnValue(this.loggerMock);
        }
    }
}
