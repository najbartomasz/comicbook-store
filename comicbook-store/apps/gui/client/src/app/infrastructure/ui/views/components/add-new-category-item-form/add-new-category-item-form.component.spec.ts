import { OutputEmitterRef } from '@angular/core';
import { setupComponent } from '@test/fixtures/setup/setup-component.fixture';
import { screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { DynamicComponentRef } from '@ui/services/dynamic-component-factory/dynamic-component-ref';
import { mock } from 'jest-mock-extended';
import { AddNewCategoryItemFormComponent } from './add-new-category-item-form.component';

describe('AddNewCategoryItemFormComponent', () => {
    test('closes the dynamic component on submit', async () => {
        // Given
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        const outputEmitterRefMock = mock<OutputEmitterRef<void>>();
        await setupComponent(AddNewCategoryItemFormComponent, {
            on: {
                close: () => {
                    outputEmitterRefMock.emit();
                }
            },
            providers: [
                DynamicComponentRef
            ]
        });

        // When
        await user.click(screen.getByRole('button', { name: 'Submit' }));

        // Then
        expect(outputEmitterRefMock.emit).toHaveBeenCalledTimes(1);
    });
});
