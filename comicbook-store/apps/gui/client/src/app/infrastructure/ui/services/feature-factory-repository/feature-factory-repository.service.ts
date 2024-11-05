import { inject, Injectable, Injector } from '@angular/core';
import { FeatureFactoryMapping } from '@feature/feature-factory-mapping.type';
import { FeatureFactoryRepository } from '@feature/feature-factory-repository.model';
import { FeatureFactoryTokenMapping } from '@feature/feature-factory-token-mapping.injection-token';

@Injectable({
    providedIn: 'root'
})
export class FeatureFactoryRepositoryService implements FeatureFactoryRepository {
    readonly #injector = inject(Injector);
    readonly #featureFactoryTokenMapping = inject(FeatureFactoryTokenMapping)

    public getFeatureFactory<T extends keyof FeatureFactoryMapping>(featureId: T): FeatureFactoryMapping[T] {
        return this.#injector.get(this.#featureFactoryTokenMapping[featureId]);
    }
}
