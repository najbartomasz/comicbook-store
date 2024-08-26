import { OutputEmitterRef } from '@angular/core';
import { LoggerFactory } from '@lib/logger/logger-factory.injection-token';
import { LoggerMockFixture } from '@test/fixtures/logger-mock/logger-mock.fixture';
import { setup } from '@test/fixtures/setup/setup.component';
import { screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { mock } from 'jest-mock-extended';
import { CategoryItemComponent } from './category-item.component';

describe('CategoryItemComponent', () => {
    test('displays category item name', async () => {
        // Given
        await setup(CategoryItemComponent, {
            componentInputs: {
                item: { id: 1, name: 'MARVEL NOW!' }
            }
        });

        // When, Then
        expect(screen.getByRole('button', { name: 'MARVEL NOW!' })).toBeVisible();
    });

    test('emits event when clicked', async () => {
        // Given
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        const { loggerFactoryMock } = new LoggerMockFixture('CategoryItemComponent');
        const outputEmitterRefMock = mock<OutputEmitterRef<void>>();
        await setup(CategoryItemComponent, {
            componentInputs: {
                item: { id: 1, name: 'MARVEL NOW!' }
            },
            componentOutputs: {
                select: outputEmitterRefMock
            },
            providers: [
                { provide: LoggerFactory, useValue: loggerFactoryMock }
            ]
        });

        // When
        await user.click(screen.getByRole('button', { name: 'MARVEL NOW!' }));

        // Then
        expect(outputEmitterRefMock.emit).toHaveBeenCalledTimes(1);
    });
});
