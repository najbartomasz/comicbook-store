import { TestBed } from '@angular/core/testing';
import { setup } from '@test/fixtures/setup/setup.component';
import { screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { DynamicComponentRef } from '@ui/services/dynamic-component-factory/dynamic-component-ref';
import { DynamicAddNewCategoryItemFormComponent } from './dynamic-add-new-category-item-form.component';

describe('DynamicAddNewCategoryItemFormComponent', () => {
    test('closes the dynamic component on submit', async () => {
        // Given
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        await setup(DynamicAddNewCategoryItemFormComponent, {
            providers: [
                DynamicComponentRef
            ]
        });
        const dynamicComponentCloseSpy = jest.spyOn(TestBed.inject(DynamicComponentRef), 'close');

        // When
        await user.click(screen.getByRole('button', { name: 'Submit' }));

        // Then
        expect(dynamicComponentCloseSpy).toHaveBeenCalledTimes(1);
    });
});
