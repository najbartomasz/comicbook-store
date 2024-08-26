import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setup } from '@test/fixtures/setup/setup.component';
import { screen, within } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { DynamicComponentRef } from '@ui/services/dynamic-component-factory/dynamic-component-ref';
import { DynamicSlidingPanelComponent } from './dynamic-sliding-panel.component';

describe('DynamicSlidingPanelComponent', () => {
    test('creates the component with provided component as content', async () => {
        // Given, When
        @Component({
            selector: 'cbs-test',
            template: '<div>Test</div>'
        })
        class TestComponent {}
        await setup(DynamicSlidingPanelComponent, {
            componentInputs: {
                componentType: TestComponent
            },
            providers: [
                DynamicComponentRef
            ]
        });

        // Then
        expect(within(screen.getByTestId('dynamic-sliding-panel-content')).getByText('Test')).toBeVisible();
    });

    test('destroys the component on close button click', async () => {
        // Given
        @Component({
            selector: 'cbs-test',
            template: '<div>Test</div>'
        })
        class TestComponent {}
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        await setup(DynamicSlidingPanelComponent, {
            componentInputs: {
                componentType: TestComponent
            },
            providers: [
                DynamicComponentRef
            ]
        });
        const dynamicComponentDestroySpy = jest.spyOn(TestBed.inject(DynamicComponentRef), 'destroy');

        // When
        await user.click(screen.getByRole('button', { name: 'X' }));

        // Then
        expect(dynamicComponentDestroySpy).toHaveBeenCalledTimes(1);
    });

    test('destroys the component on escape keydown', async () => {
        // Given
        @Component({
            selector: 'cbs-test',
            template: '<div>Test</div>'
        })
        class TestComponent {}
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        await setup(DynamicSlidingPanelComponent, {
            componentInputs: {
                componentType: TestComponent
            },
            providers: [
                DynamicComponentRef
            ]
        });
        const dynamicComponentDestroySpy = jest.spyOn(TestBed.inject(DynamicComponentRef), 'destroy');

        // When
        await user.keyboard('{Escape}');

        // Then
        expect(dynamicComponentDestroySpy).toHaveBeenCalledTimes(1);
    });

    test('destroys the component when close event was received', async () => {
        // Given
        @Component({
            selector: 'cbs-test',
            template: '<div>Test</div>'
        })
        class TestComponent {}
        await setup(DynamicSlidingPanelComponent, {
            componentInputs: {
                componentType: TestComponent
            },
            providers: [
                DynamicComponentRef
            ]
        });
        const dynamicComponentRef = TestBed.inject(DynamicComponentRef);
        const dynamicComponentDestroySpy = jest.spyOn(dynamicComponentRef, 'destroy');

        // When
        dynamicComponentRef.close();
        await jest.runAllTimersAsync();

        // Then
        expect(dynamicComponentDestroySpy).toHaveBeenCalledTimes(1);
    });
});
