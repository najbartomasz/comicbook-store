import { Component, output } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { screen, within } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { setupComponent } from '@testing/fixtures';
import { DynamicComponentRef } from '@ui/services';
import { Closable } from '@ui/views/models';
import { DynamicSlidingPanelComponent } from './dynamic-sliding-panel.component';

describe('DynamicSlidingPanelComponent', () => {
    test('creates the component with provided component as content', async () => {
        // Given, When
        @Component({
            selector: 'cbs-test',
            template: '<div>Test</div>'
        })
        class TestComponent implements Closable<void> {
            public readonly close = output();
        }
        await setupComponent(DynamicSlidingPanelComponent, {
            inputs: {
                projectedComponent: TestComponent
            },
            providers: [
                DynamicComponentRef
            ]
        });

        // Then
        expect(within(screen.getByTestId('dynamic-sliding-panel-content')).queryByText('Test')).toBeVisible();
    });

    test('closes the component on close button click', async () => {
        // Given
        @Component({
            selector: 'cbs-test',
            template: '<div>Test</div>'
        })
        class TestComponent implements Closable<void> {
            public readonly close = output();
        }
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        await setupComponent(DynamicSlidingPanelComponent, {
            inputs: {
                projectedComponent: TestComponent
            },
            providers: [
                DynamicComponentRef
            ]
        });
        const dynamicComponentRefCloseSpy = jest.spyOn(TestBed.inject(DynamicComponentRef), 'close');

        // When
        await user.click(screen.getByRole('button', { name: 'X' }));

        // Then
        expect(dynamicComponentRefCloseSpy).toHaveBeenCalledTimes(1);
        expect(dynamicComponentRefCloseSpy).toHaveBeenCalledWith(undefined);
    });

    test('closes the component on escape keydown', async () => {
        // Given
        @Component({
            selector: 'cbs-test',
            template: '<div>Test</div>'
        })
        class TestComponent implements Closable<void> {
            public readonly close = output();
        }
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        await setupComponent(DynamicSlidingPanelComponent, {
            inputs: {
                projectedComponent: TestComponent
            },
            providers: [
                DynamicComponentRef
            ]
        });
        const dynamicComponentRefCloseSpy = jest.spyOn(TestBed.inject(DynamicComponentRef), 'close');

        // When
        await user.keyboard('{Escape}');

        // Then
        expect(dynamicComponentRefCloseSpy).toHaveBeenCalledTimes(1);
        expect(dynamicComponentRefCloseSpy).toHaveBeenCalledWith(undefined);
    });

    test('closes the component when close event was received', async () => {
        // Given
        @Component({
            selector: 'cbs-test',
            template: '<div>Test</div>'
        })
        class TestComponent implements Closable<string> {
            public readonly close = output<string>();
        }
        await setupComponent(DynamicSlidingPanelComponent, {
            inputs: {
                projectedComponent: TestComponent
            },
            providers: [
                DynamicComponentRef
            ]
        });
        const dynamicComponentRef = TestBed.inject(DynamicComponentRef);
        const dynamicComponentRefCloseSpy = jest.spyOn(dynamicComponentRef, 'close');

        // When
        dynamicComponentRef.close('data');
        await jest.runAllTimersAsync();

        // Then
        expect(dynamicComponentRefCloseSpy).toHaveBeenCalledTimes(1);
        expect(dynamicComponentRefCloseSpy).toHaveBeenCalledWith('data');
    });
});
