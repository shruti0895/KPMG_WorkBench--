import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, linkedSignal, model, signal, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

export type SwitchState = 'enabled' | 'hovered' | 'pressed' | 'disabled';
export type SwitchLabelPlacement = 'start' | 'end';

/**
 * WorkBench Switch — mirrors packages/ui/src/components/Switch/Switch.jsx
 * (16 Figma variants). `checked` is a model: bind `[(checked)]`, or use
 * `defaultChecked` for uncontrolled usage. Label/helper text are strings.
 */
@Component({
  selector: 'kpmg-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { style: 'display: contents' },
  template: `
    <div [class]="rootClasses()">
      @if (name()) {
        <input type="hidden" [attr.name]="name()" [value]="isChecked() ? value() || 'on' : ''" [disabled]="isDisabled()" [required]="required()" />
      }
      <button
        type="button"
        role="switch"
        [attr.id]="switchId()"
        [class]="trackClasses()"
        [attr.aria-checked]="isChecked()"
        [attr.aria-disabled]="isDisabled()"
        [attr.aria-label]="ariaLabel() ?? label()"
        [attr.aria-labelledby]="ariaLabelledby()"
        [attr.aria-describedby]="ariaDescribedby()"
        [disabled]="isDisabled()"
        [attr.tabindex]="isDisabled() ? -1 : 0"
        (keydown)="onKeydown($event)"
        (mousedown)="setPressed(true)"
        (mouseup)="setPressed(false)"
        (mouseenter)="setHovered(true)"
        (mouseleave)="onMouseLeave()"
        (click)="toggle()"
      >
        <span [class]="thumbClasses()">
          @if (icon()) {
            <span [class]="iconClasses()">
              @if (isChecked()) {
                @if (customCheckIcon(); as tpl) {
                  <ng-container [ngTemplateOutlet]="tpl" />
                } @else {
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M13.8639 3.65609C14.0533 3.85704 14.0439 4.17348 13.8429 4.36288L5.91309 11.8368C5.67573 12.0605 5.30311 12.0536 5.07417 11.8213L2.39384 9.10093C2.20003 8.90422 2.20237 8.58765 2.39907 8.39384C2.59578 8.20003 2.91235 8.20237 3.10616 8.39907L5.51192 10.8407L13.1571 3.63516C13.358 3.44577 13.6745 3.45513 13.8639 3.65609Z" fill="currentColor" />
                  </svg>
                }
              } @else {
                @if (customDismissIcon(); as tpl) {
                  <ng-container [ngTemplateOutlet]="tpl" />
                } @else {
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M2.58859 2.71569L2.64645 2.64645C2.82001 2.47288 3.08944 2.4536 3.28431 2.58859L3.35355 2.64645L8 7.293L12.6464 2.64645C12.8417 2.45118 13.1583 2.45118 13.3536 2.64645C13.5488 2.84171 13.5488 3.15829 13.3536 3.35355L8.707 8L13.3536 12.6464C13.5271 12.82 13.5464 13.0894 13.4114 13.2843L13.3536 13.3536C13.18 13.5271 12.9106 13.5464 12.7157 13.4114L12.6464 13.3536L8 8.707L3.35355 13.3536C3.15829 13.5488 2.84171 13.5488 2.64645 13.3536C2.45118 13.1583 2.45118 12.8417 2.64645 12.6464L7.293 8L2.64645 3.35355C2.47288 3.17999 2.4536 2.91056 2.58859 2.71569L2.64645 2.64645L2.58859 2.71569Z" fill="currentColor" />
                  </svg>
                }
              }
            </span>
          }
        </span>
      </button>
      @if (label() || helperText()) {
        <div class="kpmg-switch-content" role="presentation" (click)="toggle()">
          @if (label()) { <span class="kpmg-switch-label">{{ label() }}</span> }
          @if (helperText()) { <span class="kpmg-switch-helper">{{ helperText() }}</span> }
        </div>
      }
    </div>
  `,
})
export class SwitchComponent {
  /** Checked status. Two-way bindable: `[(checked)]`. */
  readonly checked = model<boolean | undefined>(undefined);
  /** Initial checked state when `checked` is not bound. */
  readonly defaultChecked = input(false, { transform: booleanAttribute });
  /** Show a checkmark / dismiss icon inside the thumb. */
  readonly icon = input(false, { transform: booleanAttribute });
  /** Force a visual state for documentation. */
  readonly state = input<SwitchState | undefined>(undefined);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly label = input<string | undefined>(undefined);
  readonly labelPlacement = input<SwitchLabelPlacement>('end');
  readonly helperText = input<string | undefined>(undefined);
  readonly required = input(false, { transform: booleanAttribute });
  readonly name = input<string | undefined>(undefined);
  readonly value = input<string | undefined>(undefined);
  /** Native button id (named `switchId` so it isn't duplicated on the host element). */
  readonly switchId = input<string | undefined>(undefined);
  readonly customCheckIcon = input<TemplateRef<unknown> | null>(null);
  readonly customDismissIcon = input<TemplateRef<unknown> | null>(null);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly ariaLabelledby = input<string | undefined>(undefined);
  readonly ariaDescribedby = input<string | undefined>(undefined);
  readonly className = input('');

  private readonly current = linkedSignal(() => this.checked() ?? this.defaultChecked());
  private readonly pressed = signal(false);
  private readonly hovered = signal(false);

  protected readonly isChecked = this.current.asReadonly();
  protected readonly isDisabled = computed(() => this.disabled() || this.state() === 'disabled');

  private readonly effectiveState = computed(() => {
    const forced = this.state();
    if (forced) return forced.toLowerCase();
    if (this.isDisabled()) return 'disabled';
    if (this.pressed()) return 'pressed';
    if (this.hovered()) return 'hovered';
    return 'enabled';
  });

  private readonly selection = computed(() => (this.isChecked() ? 'checked' : 'unchecked'));

  protected readonly rootClasses = computed(() =>
    [
      'kpmg-switch-root',
      this.isDisabled() ? 'kpmg-switch-root--disabled' : '',
      this.labelPlacement() === 'start' ? 'kpmg-switch-root--label-start' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );
  protected readonly trackClasses = computed(
    () => `kpmg-switch-track kpmg-switch-track--${this.selection()} kpmg-switch-track--${this.effectiveState()}`,
  );
  protected readonly thumbClasses = computed(
    () => `kpmg-switch-thumb kpmg-switch-thumb--${this.selection()} kpmg-switch-thumb--${this.effectiveState()}`,
  );
  protected readonly iconClasses = computed(
    () => `kpmg-switch-icon kpmg-switch-icon--${this.selection()} kpmg-switch-icon--${this.effectiveState()}`,
  );

  protected toggle(): void {
    if (this.isDisabled()) return;
    const next = !this.isChecked();
    this.current.set(next);
    this.checked.set(next);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;
    if (event.key === ' ') {
      event.preventDefault(); // prevent page scroll
      this.toggle();
    }
  }

  protected setPressed(value: boolean): void {
    if (!this.isDisabled() && !this.state()) this.pressed.set(value);
  }

  protected setHovered(value: boolean): void {
    if (!this.isDisabled() && !this.state()) this.hovered.set(value);
  }

  protected onMouseLeave(): void {
    this.setHovered(false);
    this.setPressed(false);
  }
}
