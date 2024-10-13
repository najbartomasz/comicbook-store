import { inject, Injectable, Type } from '@angular/core';
import { DynamicComponentFactoryService } from '@ui/services/dynamic-component-factory/dynamic-component-factory.service';
import { DynamicComponentRef } from '@ui/services/dynamic-component-factory/dynamic-component-ref';
import { Closable } from '@ui/views/models/closable.model';
import { DynamicSlidingPanelComponent } from './dynamic-sliding-panel.component';

@Injectable({
    providedIn: 'root'
})
export class DynamicSlidingPanelComponentFactoryService {
    readonly #dynamicComponentFactory = inject(DynamicComponentFactoryService);

    public create<T extends Closable>(component: Type<T>): DynamicComponentRef {
        return this.#dynamicComponentFactory.create(DynamicSlidingPanelComponent<T>, {
            componentInputs: {
                projectedComponent: component
            }
        });
    }
}
