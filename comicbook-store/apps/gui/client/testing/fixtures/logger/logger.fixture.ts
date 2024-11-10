import { Logger, LoggerFactory } from '@comicbook-store/logger';
import { mock } from 'jest-mock-extended';

export class LoggerFixture {
    public get loggerFactoryMock(): LoggerFactory { return this.#loggerFactoryMock; }
    public get loggerMock(): Logger { return this.#loggerMock; }

    readonly #loggerFactoryMock = mock<LoggerFactory>();
    readonly #loggerMock = mock<Logger>();

    public constructor() {
        this.#loggerFactoryMock.createLogger.mockReturnValue(this.#loggerMock);
    }
}
