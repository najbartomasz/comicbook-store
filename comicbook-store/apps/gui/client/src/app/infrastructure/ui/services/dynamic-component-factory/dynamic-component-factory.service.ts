import { DOCUMENT } from '@angular/common';
import {
    ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, inject, Injectable, Injector, Provider, Type
} from '@angular/core';
import { finalize, take } from 'rxjs';
import { DynamicComponentRef } from './dynamic-component-ref';
import { DynamicComponentConfig } from './dynamic-component.config';

@Injectable({
    providedIn: 'root'
})
export class DynamicComponentFactoryService {
    readonly #applicationRef = inject(ApplicationRef);
    readonly #injector = inject(EnvironmentInjector);

    public create<T>(component: Type<T>, config?: DynamicComponentConfig): DynamicComponentRef {
        const dynamicComponentRef = new DynamicComponentRef();
        const componentRef = this.#createComponent(component, [{ provide: DynamicComponentRef, useValue: dynamicComponentRef }], config);
        dynamicComponentRef.close$
            .pipe(
                take(1),
                finalize(() => {
                    this.#destroyComponent(componentRef);
                })
            )
            .subscribe();
        return dynamicComponentRef;
    }

    #createComponent<T>(component: Type<T>, providers: Provider[], config?: DynamicComponentConfig): ComponentRef<T> {
        const componentRef = createComponent(component, {
            environmentInjector: this.#applicationRef.injector,
            elementInjector: Injector.create({
                providers
            })
        });
        this.#setInputs(componentRef, config?.componentInputs);
        this.#attachView(componentRef, config?.hostElement);
        return componentRef;
    }

    #setInputs<T>(componentRef: ComponentRef<T>, componentInputs?: object): void {
        Object.entries(componentInputs ?? {}).forEach(([inputName, inputValue]) => {
            componentRef.setInput(inputName, inputValue);
        });
    }

    #attachView<T>(componentRef: ComponentRef<T>, hostElement: HTMLElement | undefined): void {
        this.#applicationRef.attachView(componentRef.hostView);
        const node = hostElement ?? this.#injector.get(DOCUMENT).body;
        node.appendChild(componentRef.location.nativeElement);
    }

    #destroyComponent<T>(componentRef: ComponentRef<T>): void {
        this.#applicationRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }
}
