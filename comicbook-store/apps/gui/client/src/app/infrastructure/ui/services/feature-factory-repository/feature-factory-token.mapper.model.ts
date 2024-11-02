import { InjectionToken } from '@angular/core';
import { FeatureFactoryMapper } from '@feature/feature-factory.mapper.model';

export type FeatureFactoryTokenMapper = {
    [T in keyof FeatureFactoryMapper]: InjectionToken<FeatureFactoryMapper[T]>;
}
