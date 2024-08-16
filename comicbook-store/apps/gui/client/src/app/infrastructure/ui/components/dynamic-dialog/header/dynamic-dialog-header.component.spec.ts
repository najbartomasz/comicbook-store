import { OutputEmitterRef } from '@angular/core';
import { setup } from '@test/fixtures/setup/setup.component';
import { screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { mock } from 'jest-mock-extended';
import { DynamicDialogHeaderComponent } from './dynamic-dialog-header.component';

describe('DynamicDialogHeaderComponent', () => {
    test('displays provided titile', async () => {
        // Given, When
        await setup(DynamicDialogHeaderComponent, {
            componentInputs: {
                title: 'Dialog title'
            }
        });

        // Then
        expect(screen.queryByRole('heading', { level: 3, name: 'Dialog title' })).toBeVisible();
    });

    test('emits event when close button is clicked', async () => {
        // Given
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        const closeOutputEmitterRefMock = mock<OutputEmitterRef<void>>();
        await setup(DynamicDialogHeaderComponent, {
            componentInputs: {
                title: 'Dialog title'
            },
            componentOutputs: {
                close: closeOutputEmitterRefMock
            }
        });

        // When
        await user.click(screen.getByRole('button', { name: 'X' }));

        // Then
        expect(closeOutputEmitterRefMock.emit).toHaveBeenCalledTimes(1);
    });
});
