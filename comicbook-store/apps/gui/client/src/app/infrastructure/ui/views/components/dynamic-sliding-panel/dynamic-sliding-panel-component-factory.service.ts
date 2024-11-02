import { inject, Injectable, Type } from '@angular/core';
import { Factory } from '@core/models/factory.model';
import { DynamicComponentFactoryService } from '@ui/services/dynamic-component-factory/dynamic-component-factory.service';
import { DynamicComponentRef } from '@ui/services/dynamic-component-factory/dynamic-component-ref';
import { DynamicSlidingPanelComponent } from './dynamic-sliding-panel.component';

@Injectable({
    providedIn: 'root'
})
export class DynamicSlidingPanelComponentFactoryService implements Factory<DynamicComponentRef>{
    readonly #dynamicComponentFactory = inject(DynamicComponentFactoryService);

    public create<T>(component: Type<T>): DynamicComponentRef {
        return this.#dynamicComponentFactory.create(DynamicSlidingPanelComponent<T>, {
            componentInputs: {
                projectedComponent: component
            }
        });
    }
}
