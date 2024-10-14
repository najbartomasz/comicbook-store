import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterViewInit, ChangeDetectionStrategy,
    Component, ElementRef, HostListener, inject, Injector, input,
    Signal,
    signal, Type, viewChild,
    ViewContainerRef
} from '@angular/core';
import { DynamicComponentRef } from '@ui/services/dynamic-component-factory/dynamic-component-ref';
import { Closable } from '@ui/views/models/closable.model';
import { DynamicSlidingPanelAnimationState } from './dynamic-sliding-panel-animation-state.enum';

@Component({
    selector: 'cbs-sliding-panel',
    standalone: true,
    imports: [CommonModule],
    animations: [
        trigger('slide', [
            state(DynamicSlidingPanelAnimationState.Hidden, style({ bottom: '-100%' })),
            state(DynamicSlidingPanelAnimationState.Visible, style({ bottom: '0' })),
            transition(`${DynamicSlidingPanelAnimationState.Hidden} <=> ${DynamicSlidingPanelAnimationState.Visible}`, [animate('0.3s')])
        ])
    ],
    templateUrl: './dynamic-sliding-panel.component.html',
    styleUrl: './dynamic-sliding-panel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicSlidingPanelComponent<T> implements AfterViewInit {
    public readonly projectedComponent = input.required<Type<T>>();

    protected readonly panelContent = viewChild.required<ElementRef, ViewContainerRef>('panelContent', { read: ViewContainerRef });
    protected readonly animationState: Signal<DynamicSlidingPanelAnimationState>;

    readonly #dynamicComponentRef = inject(DynamicComponentRef);
    readonly #injector = inject(Injector);
    readonly #animationState = signal(DynamicSlidingPanelAnimationState.Hidden);
    readonly #projectedComponentOutput = signal<unknown>(undefined);

    public constructor() {
        this.animationState = this.#animationState.asReadonly();
    }

    public ngAfterViewInit() {
        this.#createProjectedComponent(this.projectedComponent());
        this.#show();
    }

    @HostListener('window:keydown.Escape')
    protected onPanelClose(): void {
        this.#hide();
    }

    protected onSlideAnimationDone({ fromState, toState }: AnimationEvent): void {
        if (fromState === DynamicSlidingPanelAnimationState.Visible && toState === DynamicSlidingPanelAnimationState.Hidden) {
            this.#dynamicComponentRef.close(this.#projectedComponentOutput());
        }
    }

    #createProjectedComponent(component: Type<T>): void {
        const componentRef = this.panelContent().createComponent(component, {
            injector: Injector.create({
                providers: [],
                parent: this.#injector
            })
        });
        if (this.#isProjectedComponentClosable(componentRef.instance)) {
            componentRef.instance.close.subscribe((value) => {
                this.#projectedComponentOutput.set(value);
                this.#hide();
            });
        }
    }

    #show(): void {
        this.#animationState.set(DynamicSlidingPanelAnimationState.Visible);
    }

    #hide(): void {
        this.#animationState.set(DynamicSlidingPanelAnimationState.Hidden);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    #isProjectedComponentClosable(componentInstance: T | T & Closable<any>): componentInstance is T & Closable<any> {
        return typeof componentInstance === 'object' && componentInstance && 'close' in componentInstance;
    }
}
