import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
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
export class DynamicAddNewCategoryItemFormComponent implements AfterViewInit {
    protected readonly categoryName = viewChild.required<ElementRef<HTMLInputElement>>('categoryName');
    protected readonly newCategoryItemForm: FormGroup;

    readonly #dynamicComponentRef = inject(DynamicComponentRef);

    public constructor(formBuilder: FormBuilder) {
        this.newCategoryItemForm = formBuilder.group({
            categoryName: ''
        });
    }

    public ngAfterViewInit(): void {
        this.categoryName().nativeElement.focus();
    }

    protected onSubmit(): void {
        this.#dynamicComponentRef.close();
    }
}
