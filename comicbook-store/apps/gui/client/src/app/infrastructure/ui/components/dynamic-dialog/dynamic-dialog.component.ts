import {
    AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, Injector, input, Type, viewChild, ViewContainerRef
} from '@angular/core';
import { filter, fromEvent, take, tap } from 'rxjs';
import { DynamicDialogRef } from './dynamic-dialog-ref';
import { DynamicDialogConfig } from './dynamic-dialog.config';
import { DynamicDialogHeaderComponent } from './header/dynamic-dialog-header.component';

@Component({
    standalone: true,
    selector: 'cbs-dynamic-dialog',
    imports: [DynamicDialogHeaderComponent],
    templateUrl: './dynamic-dialog.component.html',
    styleUrl: './dynamic-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicDialogComponent implements AfterViewInit {
    public readonly componentType = input.required<Type<unknown>>();
    public readonly config = input.required<DynamicDialogConfig>();

    protected readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
    protected readonly dialogBody = viewChild.required<ElementRef, ViewContainerRef>('dialogBody', { read: ViewContainerRef });

    readonly #injector = inject(Injector);
    readonly #dynamicDialogRef = inject(DynamicDialogRef);

    public ngAfterViewInit(): void {
        this.#createProjectableComponent();
        this.#listenToDialogBackdropClick();
        this.#listenToDialogClose();
        this.#showDialog();
    }

    protected onClose(): void {
        this.#hideDialog();
    }

    #createProjectableComponent(): void {
        this.dialogBody().createComponent(this.componentType(), {
            injector: Injector.create({
                providers: [],
                parent: this.#injector
            })
        });
    }

    #showDialog(): void {
        this.dialog().nativeElement.showModal();
    }

    #hideDialog(): void {
        this.dialog().nativeElement.close();
    }

    #listenToDialogBackdropClick(): void {
        fromEvent(this.dialog().nativeElement, 'click')
            .pipe(
                filter((event) => event.target === this.dialog().nativeElement),
                take(1),
                tap(() => {
                    this.#hideDialog();
                })
            )
            .subscribe();
    }

    #listenToDialogClose(): void {
        fromEvent(this.dialog().nativeElement, 'close')
            .pipe(
                take(1),
                tap(() => {
                    this.#dynamicDialogRef.close();
                })
            )
            .subscribe();
    }
}
