import { inject, Injectable } from '@angular/core';
import { DynamicComponentFactoryService } from '@ui/services/dynamic-component-factory/dynamic-component-factory.service';
import { DynamicComponentRef } from '@ui/services/dynamic-component-factory/dynamic-component-ref';
import { DynamicSlidingPanelComponent } from './dynamic-sliding-panel.component';

@Injectable({
    providedIn: 'root'
})
export class DynamicSlidingPanelComponentFactoryService {
    readonly #dynamicComponentFactory = inject(DynamicComponentFactoryService);

    public create<T>(component: T): DynamicComponentRef {
        return this.#dynamicComponentFactory.create(DynamicSlidingPanelComponent, {
            componentInputs: {
                componentType: component
            }
        });
    }
}
