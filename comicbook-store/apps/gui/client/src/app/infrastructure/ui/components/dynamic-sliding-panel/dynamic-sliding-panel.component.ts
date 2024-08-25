import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, Injector, input, OnInit, signal, Type, viewChild,
    ViewContainerRef
} from '@angular/core';
import { DynamicComponentRef } from '@ui/services/dynamic-component-factory/dynamic-component-ref';
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
export class DynamicSlidingPanelComponent implements OnInit, AfterViewInit {
    public readonly componentType = input.required<Type<unknown>>();

    protected readonly panelContent = viewChild.required<ElementRef, ViewContainerRef>('panelContent', { read: ViewContainerRef });
    protected animationState = signal<DynamicSlidingPanelAnimationState>(DynamicSlidingPanelAnimationState.Hidden);

    readonly #dynamicComponentRef = inject(DynamicComponentRef);
    readonly #injector = inject(Injector);

    public ngOnInit(): void {
        this.panelContent().createComponent(this.componentType(), {
            injector: Injector.create({
                providers: [],
                parent: this.#injector
            })
        });
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

    #show(): void {
        this.animationState.set(DynamicSlidingPanelAnimationState.Visible);
    }

    #hide(): void {
        this.animationState.set(DynamicSlidingPanelAnimationState.Hidden);
    }
}
