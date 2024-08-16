import { ApplicationRef, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { DynamicDialogService } from './dynamic-dialog.service';

describe('DynamicDialogService', () => {
    test('creates dialog with provided compoment and attaches it to the DOM', () => {
        // Given
        @Component({
            template: '<div>Test component</div>'
        })
        class TestComponent {}
        const applicationRef = TestBed.inject(ApplicationRef);
        const dynamicDialogService = TestBed.inject(DynamicDialogService);

        // When
        dynamicDialogService.open(TestComponent, { title: 'Dialog Title' });
        applicationRef.tick();

        // Then
        const dialog = screen.getByRole('dialog');
        expect(within(dialog).queryByText('Dialog Title')).toBeVisible();
        expect(within(dialog).queryByText('Test component')).toBeVisible();
    });

    test('detaches dialog from the DOM when closed', async () => {
        // Given
        @Component({
            template: '<div>Test component</div>'
        })
        class TestComponent {}
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        const applicationRef = TestBed.inject(ApplicationRef);
        const dynamicDialogService = TestBed.inject(DynamicDialogService);
        const dynamicDialogRef = dynamicDialogService.open(TestComponent, { title: 'Dialog Title' });
        const closeSpy = jest.spyOn(dynamicDialogRef, 'close');
        applicationRef.tick();

        // When
        await user.click(screen.getByRole('button', { name: 'X' }));

        // Then
        expect(screen.queryByRole('dialog', { hidden: true })).not.toBeInTheDocument();
        expect(closeSpy).toHaveBeenCalledTimes(1);
    });
});
