/* eslint-disable no-console */
import { TestBed } from '@angular/core/testing';
import { Logger, injectLogger } from '.';

describe('Logger', () => {
    let logger1: Logger;
    let logger2: Logger;
    let logger3: Logger;

    beforeEach(() => {
        TestBed.runInInjectionContext(() => {
            logger1 = injectLogger('TestLogger1');
            logger2 = injectLogger('TestLogger2');
            logger3 = injectLogger('TestLogger3');
        });
    });

    test('prints messages on debug console', () => {
        // Given
        jest.spyOn(console, 'info').mockImplementationOnce(jest.fn());
        jest.spyOn(console, 'warn').mockImplementationOnce(jest.fn());
        jest.spyOn(console, 'error').mockImplementationOnce(jest.fn());
        const dateMock1 = new Date('2024-02-29T08:01:59.326Z');
        const dateMock2 = new Date('2024-02-29T08:02:14.430Z');
        const dateMock3 = new Date('2024-02-29T08:02:25.252Z');
        jest.spyOn(global, 'Date')
            .mockReturnValueOnce(dateMock1)
            .mockReturnValueOnce(dateMock2)
            .mockReturnValueOnce(dateMock3);

        // When
        logger1.info('First: test info message.');
        logger2.warn('Second: test warn message.');
        logger3.error('Third: test error message.', new Error('Test error.'));

        // Then
        expect(console.info).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.info).toHaveBeenCalledWith('2024-02-29T08:01:59.326Z TestLogger1 INFO: First: test info message.');
        expect(console.warn).toHaveBeenCalledWith('2024-02-29T08:02:14.430Z TestLogger2 WARN: Second: test warn message.');
        expect(console.error).toHaveBeenCalledWith(
            '2024-02-29T08:02:25.252Z TestLogger3 ERROR: Third: test error message. Caused by: Test error.'
        );
    });
});
