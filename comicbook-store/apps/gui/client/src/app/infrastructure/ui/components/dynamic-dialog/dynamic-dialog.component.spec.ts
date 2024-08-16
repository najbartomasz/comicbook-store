import { Component } from '@angular/core';
import { setup } from '@test/fixtures/setup/setup.component';
import { screen, within } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { DynamicDialogRef } from './dynamic-dialog-ref';
import { DynamicDialogComponent } from './dynamic-dialog.component';

describe('DynamicDialogComponent', () => {
    test('displays header with given title and provided component when created', async () => {
        // Given, When
        @Component({
            template: '<div>Test component</div>'
        })
        class TestComponent {}
        await setup(DynamicDialogComponent, {
            componentInputs: {
                componentType: TestComponent,
                config: {
                    title: 'Dialog Title'
                }
            },
            componentProviders: [
                { provide: DynamicDialogRef, useValue: new DynamicDialogRef() }
            ]
        });

        // Then
        const dialog = screen.getByRole('dialog');
        expect(within(dialog).queryByText('Dialog Title')).toBeVisible();
        expect(within(dialog).queryByText('Test component')).toBeVisible();
    });

    test('has provided width and height when created', async () => {
        // Given, When
        @Component({
            template: '<div>Test component</div>'
        })
        class TestComponent {}
        await setup(DynamicDialogComponent, {
            componentInputs: {
                componentType: TestComponent,
                config: {
                    title: 'Dialog Title',
                    width: 400,
                    height: 500
                }
            },
            componentProviders: [
                { provide: DynamicDialogRef, useValue: new DynamicDialogRef() }
            ]
        });

        // Then
        const dialog = screen.getByRole('dialog');
        expect(dialog.style.width).toBe('400px');
        expect(dialog.style.height).toBe('500px');
    });

    test('closes modal on close button click', async () => {
        // Given
        @Component({
            template: '<div>Test component</div>'
        })
        class TestComponent {}
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        await setup(DynamicDialogComponent, {
            componentInputs: {
                componentType: TestComponent,
                config: {
                    title: 'Dialog Title'
                }
            },
            componentProviders: [
                { provide: DynamicDialogRef, useValue: new DynamicDialogRef() }
            ]
        });

        // When
        await user.click(screen.getByRole('button', { name: 'X' }));

        // Then
        expect(screen.queryByRole('dialog', { hidden: true })).not.toBeVisible();
    });

    test('closes modal on backdrop click', async () => {
        // Given
        @Component({
            template: '<div>Test component</div>'
        })
        class TestComponent {}
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        await setup(DynamicDialogComponent, {
            componentInputs: {
                componentType: TestComponent,
                config: {
                    title: 'Dialog Title'
                }
            },
            componentProviders: [
                { provide: DynamicDialogRef, useValue: new DynamicDialogRef() }
            ]
        });

        // When
        await user.click(screen.getByRole('dialog'));

        // Then
        expect(screen.queryByRole('dialog', { hidden: true })).not.toBeVisible();
    });

    test('does not close modal on content click', async () => {
        // Given
        @Component({
            template: '<div>Test component</div>'
        })
        class TestComponent {}
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        await setup(DynamicDialogComponent, {
            componentInputs: {
                componentType: TestComponent,
                config: {
                    title: 'Dialog Title'
                }
            },
            componentProviders: [
                { provide: DynamicDialogRef, useValue: new DynamicDialogRef() }
            ]
        });

        // When
        await user.click(screen.getByTestId('dialog-content'));

        // Then
        expect(screen.queryByRole('dialog')).toBeVisible();
    });
});
