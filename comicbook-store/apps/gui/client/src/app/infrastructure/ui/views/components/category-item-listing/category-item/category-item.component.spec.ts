import { OutputEmitterRef } from '@angular/core';
import { setupComponent } from '@test/fixtures/setup/setup-component.fixture';
import { screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { mock } from 'jest-mock-extended';
import { CategoryItemComponent } from './category-item.component';

describe('CategoryItemComponent', () => {
    test('displays category item name', async () => {
        // Given
        await setupComponent(CategoryItemComponent, {
            inputs: {
                item: { id: 1, name: 'MARVEL NOW!' }
            }
        });

        // When, Then
        expect(screen.queryByRole('button', { name: 'MARVEL NOW!' })).toBeVisible();
    });

    test('emits event when clicked', async () => {
        // Given
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        const outputEmitterRefMock = mock<OutputEmitterRef<void>>();
        await setupComponent(CategoryItemComponent, {
            inputs: {
                item: { id: 1, name: 'MARVEL NOW!' }
            },
            on: {
                select: () => { outputEmitterRefMock.emit(); }
            }
        });

        // When
        await user.click(screen.getByRole('button', { name: 'MARVEL NOW!' }));

        // Then
        expect(outputEmitterRefMock.emit).toHaveBeenCalledTimes(1);
    });
});
