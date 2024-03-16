import { MockProxy, mock } from 'jest-mock-extended';
import { LoggerFactoryService, Logger } from '@lib/logger';

export class LoggerMockFixture {
    public loggerFactory: MockProxy<LoggerFactoryService>;
    public logger: MockProxy<Logger>;

    public constructor(loggerName?: string) {
        this.loggerFactory = mock<LoggerFactoryService>();
        this.logger = mock<Logger>();
        if (loggerName) {
            this.loggerFactory.createLogger.calledWith(loggerName).mockReturnValueOnce(this.logger);
        } else {
            this.loggerFactory.createLogger.mockReturnValue(this.logger);
        }
    }

    public static get loggerFactory(): MockProxy<LoggerFactoryService> {
        return new LoggerMockFixture().loggerFactory;
    }
}
