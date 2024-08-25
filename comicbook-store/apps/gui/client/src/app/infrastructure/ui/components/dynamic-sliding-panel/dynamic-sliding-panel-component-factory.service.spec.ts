import { ApplicationRef, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { setup } from '@test/fixtures/setup/setup.module';
import { screen } from '@testing-library/angular';
import { DynamicComponentFactoryService } from '@ui/services/dynamic-component-factory/dynamic-component-factory.service';
import { DynamicSlidingPanelComponentFactoryService } from './dynamic-sliding-panel-component-factory.service';
import { DynamicSlidingPanelComponent } from './dynamic-sliding-panel.component';

describe('DynamicSlidingPanelComponentFactoryService', () => {
    test('creates dynamic sliding panel component', () => {
        // Given
        @Component({
            selector: 'cbs-test',
            template: '<div>Test</div>'
        })
        class TestComponent {}
        setup({
            imports: [
                NoopAnimationsModule
            ]
        });
        const applicationRef = TestBed.inject(ApplicationRef);
        const dynamicComponentFactory = TestBed.inject(DynamicComponentFactoryService);
        const createSpy = jest.spyOn(dynamicComponentFactory, 'create');
        const dynamicSlidingPanelComponentFactory = TestBed.inject(DynamicSlidingPanelComponentFactoryService);

        // When
        dynamicSlidingPanelComponentFactory.create(TestComponent);
        applicationRef.tick();

        // Then
        expect(createSpy).toHaveBeenCalledTimes(1);
        expect(createSpy).toHaveBeenCalledWith(
            DynamicSlidingPanelComponent,
            {
                componentInputs: {
                    componentType: TestComponent
                }
            }
        );
        expect(screen.getByText('Test')).toBeVisible();
    });
});
