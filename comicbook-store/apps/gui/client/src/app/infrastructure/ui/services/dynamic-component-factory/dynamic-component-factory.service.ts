import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, inject, Injectable, Injector, Type } from '@angular/core';
import { take, tap } from 'rxjs';
import { DynamicComponentRef } from './dynamic-component-ref';
import { DynamicComponentConfig } from './dynamic-component.config';

@Injectable({
    providedIn: 'root'
})
export class DynamicComponentFactoryService {
    readonly #applicationRef = inject(ApplicationRef);
    readonly #injector = inject(EnvironmentInjector);

    public create<T, U extends Record<string, unknown>>(component: Type<T>, config?: DynamicComponentConfig<U>): DynamicComponentRef {
        const dynamicDialogRef = new DynamicComponentRef();
        const componentRef = createComponent(component, {
            environmentInjector: this.#applicationRef.injector,
            elementInjector: Injector.create({
                providers: [{ provide: DynamicComponentRef, useValue: dynamicDialogRef }]
            })
        });
        if (config?.componentInputs) {
            this.#setComponentInputs(componentRef, config.componentInputs);
        }
        dynamicDialogRef.close$
            .pipe(
                take(1),
                tap(() => {
                    this.#applicationRef.detachView(componentRef.hostView);
                    componentRef.destroy();
                })
            )
            .subscribe();
        this.#applicationRef.attachView(componentRef.hostView);
        const hostElement = config?.hostElement ?? this.#injector.get(DOCUMENT).body;
        hostElement.appendChild(componentRef.location.nativeElement);
        return dynamicDialogRef;
    }

    #setComponentInputs<T, U>(componentRef: ComponentRef<T>, componentInputs: Record<string, U>): void {
        Object.entries(componentInputs).forEach(([key, value]) => {
            componentRef.setInput(key, value);
        });
    }
}
