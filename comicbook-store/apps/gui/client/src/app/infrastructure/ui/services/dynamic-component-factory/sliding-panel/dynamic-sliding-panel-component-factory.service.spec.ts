import { ApplicationRef, Component, output } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { screen } from '@testing-library/angular';
import { setupModule } from '@testing/fixtures';
import { DynamicComponentFactoryService, DynamicComponentRef } from '@ui/services';
import { DynamicSlidingPanelComponent } from '@ui/views/components';
import { Closable } from '@ui/views/models';
import { DynamicSlidingPanelComponentFactoryService } from './dynamic-sliding-panel-component-factory.service';

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
