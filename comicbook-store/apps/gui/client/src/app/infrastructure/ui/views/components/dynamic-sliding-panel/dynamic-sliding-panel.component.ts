import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterViewInit, ChangeDetectionStrategy,
    Component, ElementRef, HostListener, inject, Injector, input, OnInit,
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
export class DynamicSlidingPanelComponent<T extends Closable> implements OnInit, AfterViewInit {
    public readonly projectedComponent = input.required<Type<T>>();

    protected readonly panelContent = viewChild.required<ElementRef, ViewContainerRef>('panelContent', { read: ViewContainerRef });
    protected readonly animationState: Signal<DynamicSlidingPanelAnimationState>;

    readonly #dynamicComponentRef = inject(DynamicComponentRef);
    readonly #injector = inject(Injector);
    readonly #animationState = signal(DynamicSlidingPanelAnimationState.Hidden);

    public constructor() {
        this.animationState = this.#animationState.asReadonly();
    }

    public ngOnInit(): void {
        this.#createProjectedComponent(this.projectedComponent());
    }

    public ngAfterViewInit() {
        this.#show();
    }

    @HostListener('window:keydown.Escape')
    protected onPanelClose(): void {
        this.#hide();
    }

    protected onSlideAnimationDone({ fromState, toState }: AnimationEvent): void {
        if (fromState === DynamicSlidingPanelAnimationState.Visible && toState === DynamicSlidingPanelAnimationState.Hidden) {
            this.#dynamicComponentRef.close();
        }
    }

    #createProjectedComponent(component: Type<T>): void {
        const componentRef = this.panelContent().createComponent(component, {
            injector: Injector.create({
                providers: [],
                parent: this.#injector
            })
        });
        componentRef.instance.close.subscribe(() => {
            this.#hide();
        });
    }

    #show(): void {
        this.#animationState.set(DynamicSlidingPanelAnimationState.Visible);
    }

    #hide(): void {
        this.#animationState.set(DynamicSlidingPanelAnimationState.Hidden);
    }
}
