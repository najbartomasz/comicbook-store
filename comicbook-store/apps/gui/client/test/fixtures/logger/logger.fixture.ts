import { Logger, LoggerFactory } from '@comicbook-store/logger';
import { mock } from 'jest-mock-extended';

export class LoggerFixture {
    public readonly loggerFactoryMock = mock<LoggerFactory>();
    public readonly loggerMock = mock<Logger>();

    public constructor() {
        this.loggerFactoryMock.createLogger.mockReturnValue(this.loggerMock);
    }

    public static get loggerFactoryMock(): LoggerFactory {
        return new LoggerFixture().loggerFactoryMock;
    }
}
