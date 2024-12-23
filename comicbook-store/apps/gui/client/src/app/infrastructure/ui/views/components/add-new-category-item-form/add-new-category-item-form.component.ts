import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, output, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Closable } from '@ui/views/models';

@Component({
    selector: 'cbs-add-new-category-item-form',
    templateUrl: './add-new-category-item-form.component.html',
    styleUrl: './add-new-category-item-form.component.scss',
    imports: [ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewCategoryItemFormComponent implements AfterViewInit, Closable<void> {
    public readonly close = output();

    protected readonly categoryName = viewChild.required<ElementRef<HTMLInputElement>>('categoryName');
    protected readonly newCategoryItemForm: FormGroup;

    public constructor(formBuilder: FormBuilder) {
        this.newCategoryItemForm = formBuilder.group({
            categoryName: ''
        });
    }

    public ngAfterViewInit(): void {
        this.categoryName().nativeElement.focus();
    }

    protected onSubmit(): void {
        this.close.emit();
    }
}
