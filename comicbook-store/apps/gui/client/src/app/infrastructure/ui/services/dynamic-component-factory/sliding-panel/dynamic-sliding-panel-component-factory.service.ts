import { inject, Injectable, Type } from '@angular/core';
import { Factory } from '@core/models';
import { DynamicComponentFactoryService, DynamicComponentRef } from '@ui/services';
import { DynamicSlidingPanelComponent } from '@ui/views/components';

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
