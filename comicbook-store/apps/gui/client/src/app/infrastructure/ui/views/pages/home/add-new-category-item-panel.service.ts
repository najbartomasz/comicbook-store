import { inject, Injectable } from '@angular/core';
import { injectLogger } from '@ui/injectors';
import { DynamicSlidingPanelComponentFactoryService } from '@ui/services';
import { AddNewCategoryItemFormComponent } from '@ui/views/components';
import { finalize, take } from 'rxjs';

@Injectable()
export class AddNewCategoryItemPanelService {
    readonly #logger = injectLogger('AddNewCategoryItemPanelService');
    readonly #dynamicSlidingPanelFactory = inject(DynamicSlidingPanelComponentFactoryService);

    public open(): void {
        const dynamicComponentRef = this.#dynamicSlidingPanelFactory.create(AddNewCategoryItemFormComponent);
        this.#logger.info('Add new category item form opened.');
        dynamicComponentRef.close$
            .pipe(
                take(1),
                finalize(() => {
                    this.#logger.info('Add new category item form closed.');
                })
            )
            .subscribe();
    }
}
