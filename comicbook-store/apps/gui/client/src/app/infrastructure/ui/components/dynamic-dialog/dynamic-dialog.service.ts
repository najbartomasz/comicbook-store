import { DOCUMENT } from '@angular/common';
import { ApplicationRef, createComponent, inject, Injectable, Injector, Type } from '@angular/core';
import { take, tap } from 'rxjs';
import { DynamicDialogRef } from './dynamic-dialog-ref';
import { DynamicDialogComponent } from './dynamic-dialog.component';
import { DynamicDialogConfig } from './dynamic-dialog.config';

@Injectable({
    providedIn: 'root'
})
export class DynamicDialogService {
    readonly #applicationRef = inject(ApplicationRef);
    readonly #document = inject(DOCUMENT);

    public open<T>(componentType: Type<T>, config: DynamicDialogConfig): DynamicDialogRef {
        return this.#createDialogComponent(componentType, config);
    }

    #createDialogComponent<T>(componentType: Type<T>, config: DynamicDialogConfig): DynamicDialogRef {
        const dynamicDialogRef = new DynamicDialogRef();
        const dynamicDialogComponentRef = createComponent(DynamicDialogComponent, {
            environmentInjector: this.#applicationRef.injector,
            elementInjector: Injector.create({
                providers: [{ provide: DynamicDialogRef, useValue: dynamicDialogRef }]
            })
        });
        dynamicDialogComponentRef.setInput('componentType', componentType);
        dynamicDialogComponentRef.setInput('config', config);
        dynamicDialogRef.closed$
            .pipe(
                take(1),
                tap(() => {
                    this.#applicationRef.detachView(dynamicDialogComponentRef.hostView);
                    dynamicDialogComponentRef.destroy();
                })
            )
            .subscribe();
        this.#applicationRef.attachView(dynamicDialogComponentRef.hostView);
        this.#document.body.appendChild(dynamicDialogComponentRef.location.nativeElement);
        return dynamicDialogRef;
    }
}
