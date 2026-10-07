/*
 * Public API surface of @designkpmg/angular
 */
export { ButtonComponent } from './lib/button/button.component';
export type { ButtonVariant, ButtonSize, ButtonType } from './lib/button/button.component';

export { IconButtonComponent } from './lib/icon-button/icon-button.component';
export type {
  IconButtonVariant,
  IconButtonSize,
  IconButtonShape,
  IconButtonType,
} from './lib/icon-button/icon-button.component';

export { BadgeComponent } from './lib/badge/badge.component';
export type { BadgeSize, BadgeStyleType, BadgeState, BadgePlacement } from './lib/badge/badge.component';

export { ChipComponent } from './lib/chip/chip.component';
export type { ChipType, ChipStyleType, ChipState } from './lib/chip/chip.component';

export { CheckboxComponent } from './lib/checkbox/checkbox.component';
export type { CheckboxSize, CheckboxState, CheckboxType } from './lib/checkbox/checkbox.component';

export { SwitchComponent } from './lib/switch/switch.component';
export type { SwitchState, SwitchLabelPlacement } from './lib/switch/switch.component';

export { TextareaComponent } from './lib/textarea/textarea.component';
export type { TextareaVariant, TextareaState, TextareaResize } from './lib/textarea/textarea.component';

export { TooltipComponent } from './lib/tooltip/tooltip.component';
export type {
  TooltipTheme,
  TooltipVariant,
  TooltipPlacement,
  TooltipAlign,
  TooltipCaretSize,
  TooltipTrigger,
  TooltipAction,
  TooltipItem,
} from './lib/tooltip/tooltip.component';
