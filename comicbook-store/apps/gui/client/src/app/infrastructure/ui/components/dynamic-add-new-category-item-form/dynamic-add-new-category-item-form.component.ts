import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicComponentRef } from '@ui/services/dynamic-component-factory/dynamic-component-ref';

@Component({
    selector: 'cbs-dynamic-add-new-category-item-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './dynamic-add-new-category-item-form.component.html',
    styleUrl: './dynamic-add-new-category-item-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicAddNewCategoryItemFormComponent {
    protected readonly newCategoryItemForm: FormGroup;

    readonly #dynamicComponentRef = inject(DynamicComponentRef);

    public constructor(formBuilder: FormBuilder) {
        this.newCategoryItemForm = formBuilder.group({
            categoryName: ''
        });
    }

    protected onSubmit(): void {
        this.#dynamicComponentRef.close();
    }
}
