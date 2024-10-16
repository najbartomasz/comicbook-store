import { ApplicationRef, Component, output } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { setupModule } from '@test/fixtures/setup/setup-module.fixture';
import { screen } from '@testing-library/angular';
import { DynamicComponentFactoryService } from '@ui/services/dynamic-component-factory/dynamic-component-factory.service';
import { DynamicComponentRef } from '@ui/services/dynamic-component-factory/dynamic-component-ref';
import { Closable } from '@ui/views/models/closable.model';
import { DynamicSlidingPanelComponentFactoryService } from './dynamic-sliding-panel-component-factory.service';
import { DynamicSlidingPanelComponent } from './dynamic-sliding-panel.component';

describe('DynamicSlidingPanelComponentFactoryService', () => {
    test('creates dynamic sliding panel component', () => {
        // Given
        @Component({
            selector: 'cbs-test',
            template: '<div>Test</div>'
        })
        class TestComponent implements Closable<void> {
            public readonly close = output();
        }
        setupModule({
            imports: [
                NoopAnimationsModule
            ]
        });
        const applicationRef = TestBed.inject(ApplicationRef);
        const dynamicComponentFactory = TestBed.inject(DynamicComponentFactoryService);
        const createSpy = jest.spyOn(dynamicComponentFactory, 'create');
        const dynamicSlidingPanelComponentFactory = TestBed.inject(DynamicSlidingPanelComponentFactoryService);

        // When
        const dynamicComponentRef = dynamicSlidingPanelComponentFactory.create(TestComponent);
        applicationRef.tick();

        // Then
        expect(dynamicComponentRef).toBeInstanceOf(DynamicComponentRef);
        expect(createSpy).toHaveBeenCalledTimes(1);
        expect(createSpy).toHaveBeenCalledWith(
            DynamicSlidingPanelComponent,
            {
                componentInputs: {
                    projectedComponent: TestComponent
                }
            }
        );
        expect(screen.queryByText('Test')).toBeVisible();
    });
});
