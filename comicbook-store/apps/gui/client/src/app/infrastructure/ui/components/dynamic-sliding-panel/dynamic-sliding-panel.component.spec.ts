import { Component } from '@angular/core';
import { setup } from '@test/fixtures/setup/setup.component';
import { screen, within } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { DynamicComponentRef } from '@ui/services/dynamic-component-factory/dynamic-component-ref';
import { mock } from 'jest-mock-extended';
import { DynamicSlidingPanelComponent } from './dynamic-sliding-panel.component';

describe('DynamicSlidingPanelComponent', () => {
    test('creates the component with provided component type', async () => {
        // Given, When
        @Component({
            selector: 'cbs-test',
            template: '<div>Test</div>'
        })
        class TestComponent {}
        const dynamicComponentRefMock = mock<DynamicComponentRef>();
        await setup(DynamicSlidingPanelComponent, {
            componentInputs: {
                componentType: TestComponent
            },
            providers: [
                { provide: DynamicComponentRef, useValue: dynamicComponentRefMock }
            ]
        });

        // Then
        expect(within(screen.getByTestId('dynamic-sliding-panel-content')).getByText('Test')).toBeVisible();
    });

    test('closes the component on backdrop click', async () => {
        // Given
        @Component({
            selector: 'cbs-test',
            template: '<div>Test</div>'
        })
        class TestComponent {}
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        const dynamicComponentRefMock = mock<DynamicComponentRef>();
        await setup(DynamicSlidingPanelComponent, {
            componentInputs: {
                componentType: TestComponent
            },
            providers: [
                { provide: DynamicComponentRef, useValue: dynamicComponentRefMock }
            ]
        });

        // When
        await user.click(screen.getByTestId('dynamic-sliding-panel-backdrop'));

        // Then
        expect(dynamicComponentRefMock.close).toHaveBeenCalledTimes(1);
    });

    test('closes the component on close button click', async () => {
        // Given
        @Component({
            selector: 'cbs-test',
            template: '<div>Test</div>'
        })
        class TestComponent {}
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        const dynamicComponentRefMock = mock<DynamicComponentRef>();
        await setup(DynamicSlidingPanelComponent, {
            componentInputs: {
                componentType: TestComponent
            },
            providers: [
                { provide: DynamicComponentRef, useValue: dynamicComponentRefMock }
            ]
        });

        // When
        await user.click(screen.getByRole('button', { name: 'X' }));

        // Then
        expect(dynamicComponentRefMock.close).toHaveBeenCalledTimes(1);
    });

    test('closes the component on escape keydown', async () => {
        // Given
        @Component({
            selector: 'cbs-test',
            template: '<div>Test</div>'
        })
        class TestComponent {}
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        const dynamicComponentRefMock = mock<DynamicComponentRef>();
        await setup(DynamicSlidingPanelComponent, {
            componentInputs: {
                componentType: TestComponent
            },
            providers: [
                { provide: DynamicComponentRef, useValue: dynamicComponentRefMock }
            ]
        });

        // When
        await user.keyboard('{Escape}');

        // Then
        expect(dynamicComponentRefMock.close).toHaveBeenCalledTimes(1);
    });
});
