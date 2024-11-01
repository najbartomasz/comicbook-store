import { ApplicationRef, Component, input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupService } from '@test/fixtures/setup/setup-service.fixture';
import { screen, within } from '@testing-library/angular';
import { DynamicComponentFactoryService } from './dynamic-component-factory.service';

describe('DynamicComponentFactoryService', () => {
    test('creates component and appends it to the DOM on document body level', () => {
        // Given
        @Component({
            selector: 'cbs-test',
            template: '<div>Test</div>'
        })
        class TestComponent {}
        const dynamicComponentFactory = setupService(DynamicComponentFactoryService);
        const applicationRef = TestBed.inject(ApplicationRef);

        // When
        dynamicComponentFactory.create(TestComponent);
        applicationRef.tick();

        // Then
        expect(screen.queryByText('Test')).toBeVisible();
    });

    test('creates component and appends it to the DOM on provided host element level', async () => {
        // Given
        @Component({
            selector: 'cbs-test-host',
            template: '<div data-testid="test-host-element">Test Host</div>'
        })
        class TestHostComponent {}
        @Component({
            selector: 'cbs-test',
            template: '<div>Test</div>'
        })
        class TestComponent {}
        const dynamicComponentFactory = setupService(DynamicComponentFactoryService);
        TestBed.createComponent(TestHostComponent);
        const applicationRef = TestBed.inject(ApplicationRef);

        // When
        dynamicComponentFactory.create(TestComponent, { hostElement: screen.getByTestId('test-host-element') });
        applicationRef.tick();

        // Then
        expect(within(screen.getByTestId('test-host-element')).queryByText('Test')).toBeVisible();
    });

    test('closes component and removes it from the DOM', () => {
        // Given
        @Component({
            selector: 'cbs-test',
            template: '<div>Test</div>'
        })
        class TestComponent {}
        const dynamicComponentFactory = setupService(DynamicComponentFactoryService);
        const applicationRef = TestBed.inject(ApplicationRef);
        const dialogRef = dynamicComponentFactory.create(TestComponent);
        applicationRef.tick();

        // When
        dialogRef.close();
        applicationRef.tick();

        // Then
        expect(screen.queryByText('Test')).not.toBeInTheDocument();
    });

    test('sets component inputs when creating component', () => {
        // Given
        @Component({
            selector: 'cbs-test',
            template: '<div>{{ testInput() }}</div>'
        })
        class TestComponent {
            public readonly testInput = input.required<string>();
        }
        const dynamicComponentFactory = setupService(DynamicComponentFactoryService);
        const applicationRef = TestBed.inject(ApplicationRef);

        // When
        dynamicComponentFactory.create(TestComponent, { componentInputs: { testInput: 'Test Input' } });
        applicationRef.tick();

        // Then
        expect(screen.queryByText('Test Input')).toBeVisible();
    });
});
