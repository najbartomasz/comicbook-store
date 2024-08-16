import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
    selector: 'cbs-dynamic-dialog-header',
    standalone: true,
    imports: [],
    templateUrl: './dynamic-dialog-header.component.html',
    styleUrl: './dynamic-dialog-header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicDialogHeaderComponent {
    public readonly title = input.required<string>();
    public readonly close = output();

    public onClose(): void {
        this.close.emit();
    }
}
