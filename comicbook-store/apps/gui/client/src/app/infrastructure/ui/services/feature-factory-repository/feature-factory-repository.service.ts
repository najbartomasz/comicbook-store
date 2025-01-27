import { inject, Injectable, Injector } from '@angular/core';
import { FeatureFactoryMapping } from '@di/feature';
import { ConcreteFeatureFactory, ConcreteFeatureId, FeatureFactoryRepository } from '@feature';

@Injectable({
    providedIn: 'root'
})
export class FeatureFactoryRepositoryService implements FeatureFactoryRepository {
    readonly #injector = inject(Injector);
    readonly #featureFactoryMapping = inject(FeatureFactoryMapping);

    public getFeatureFactory<T extends ConcreteFeatureId>(featureId: T): ConcreteFeatureFactory<T> {
        return this.#injector.get(this.#featureFactoryMapping[featureId]);
    }
}
