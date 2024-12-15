import { Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { BrandingProviderFeatureId } from '@feature';
import { injectFeature } from '@ui/injectors';

@Injectable()
export class CategoryItemProviderService {
    public readonly categoryItems = rxResource({
        loader: () => this.#brandingProviderFeature.getAllBrandings()
    });

    readonly #brandingProviderFeature = injectFeature(BrandingProviderFeatureId);
}
