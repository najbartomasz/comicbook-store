import { inject, Injectable, Injector } from '@angular/core';
import { FeatureFactoryRepository } from '@feature/feature-factory-repository.model';
import { FeatureFactoryMapper } from '@feature/feature-factory.mapper.model';
import { FeatureFactoryTokenMapper } from './feature-factory-token.mapper.injection-token';

@Injectable({
    providedIn: 'root'
})
export class FeatureFactoryRepositoryService implements FeatureFactoryRepository {
    readonly #injector = inject(Injector);
    readonly #featureFactoryTokenMapper = inject(FeatureFactoryTokenMapper)

    public getFeatureFactory<T extends keyof FeatureFactoryMapper>(featureId: T): FeatureFactoryMapper[T] {
        return this.#injector.get(this.#featureFactoryTokenMapper[featureId]);
    }
}
