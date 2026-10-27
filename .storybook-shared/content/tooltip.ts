import type { ComponentDoc } from '../types';

export const tooltip: ComponentDoc = {
  overview: {
    what:
      'A tooltip shows short, supplementary information next to the element it describes. It comes as a small or large plain tooltip, a rich tooltip with a title, text and actions, or a menu, in elevated or filled style with an optional caret.',
    when: [
      'Small and large tooltips: name an icon-only control or explain a term in a few words.',
      'Rich tooltips: give a title, a short description and up to a few actions.',
      'Menu type: show a short checklist or list of items from a trigger.',
    ],
    whenNot: [
      'Do not put essential information in a tooltip; show it as visible text or in a Message.',
      'Do not use a tooltip for long content or complex interaction; use Sheets or a Modal instead.',
      'Do not use a tooltip for a list of actions the user opens deliberately; use a Menu instead.',
    ],
    anatomy: [
      { part: 'Trigger', description: 'The wrapped element the tooltip describes.' },
      { part: 'Container', description: 'Elevated or filled surface, placed at the top, bottom, left or right with a chosen alignment.' },
      { part: 'Caret', description: 'Optional pointer in small, medium or large size that connects the tooltip to the trigger.' },
      { part: 'Title and text', description: 'Short text, or in rich tooltips a title, description and optional secondary text after a divider.' },
      { part: 'Actions or items', description: 'Buttons in rich tooltips, or menu items in the menu type.' },
    ],
  },
  variants: [
    { name: 'Base small', purpose: 'Single-line label. Use it to name an icon-only control or give a few words of explanation. This is the default.' },
    { name: 'Base large', purpose: 'Multi-line supporting text. Use it when the explanation needs a sentence or two.' },
    { name: 'Rich', purpose: 'Title, description, optional secondary text after a divider, and buttons. Use it for short guidance with a next step.' },
    { name: 'Menu', purpose: 'A short list of selectable items opened from the trigger. Use it for a small checklist, not for navigation.' },
    { name: 'Elevated and filled', purpose: 'Theme: elevated (default, white with shadow) or filled (tinted). The choice is visual only.' },
  ],
  formatting: [
    {
      title: 'Placement',
      points: [
        'Position the tooltip at the top (default), bottom, left or right of the trigger, and align it left, center or right (top, middle or bottom for side positions).',
        'Choose a position that does not cover related content or run off the page; placement is not adjusted automatically.',
        'Use the caret to point at the trigger. Its size follows the type (small, medium or large) and can be set with caretSize.',
      ],
    },
    {
      title: 'Content',
      points: [
        'Keep small tooltips to a few words and avoid repeating the visible label.',
        'In rich tooltips use at most two actions, with the main action first.',
        'Use width, minWidth or maxWidth to control the width of multi-line tooltips.',
      ],
    },
  ],
  behaviors: [
    {
      title: 'Mouse',
      points: [
        'With the hover trigger (default) the tooltip opens after 150 ms on mouse enter and closes after 150 ms on mouse leave. Change this with delay and closeDelay.',
        'With the click trigger, clicking the trigger toggles the tooltip and a click outside closes it.',
      ],
    },
    {
      title: 'Keyboard and focus',
      points: [
        'With the hover trigger the tooltip opens on focus and closes on blur.',
        'There is no Escape handler. The click trigger is not opened by keyboard unless the trigger element is itself a button.',
      ],
    },
    {
      title: 'States',
      points: [
        'The tooltip is visible when open is true, or always when static is set (static tooltips ignore the trigger).',
        'Use open with onOpenChange to control it, or defaultOpen to start open. The menu type reports selections through onSelect and onItemClick.',
      ],
    },
  ],
  accessibility: [
    'The trigger references the tooltip with aria-describedby, and the tooltip has role="tooltip" (role="menu" for the menu type).',
    'With the hover trigger, the tooltip opens on both mouse hover and keyboard focus and closes on mouse leave and blur, so keyboard users get the same information.',
    'The menu type sets aria-haspopup and aria-expanded on the trigger.',
    'The tooltip is hidden from assistive technology with aria-hidden while closed.',
    'There is no Escape key handler; the click trigger closes on an outside click. Do not put information in a tooltip that is not available elsewhere.',
  ],
  references: [
    { label: 'Menu', text: 'Use a menu for a list of actions that the user opens deliberately.' },
    { label: 'Modal', text: 'Use a modal for content that needs full attention.' },
    { label: 'IconButton', text: 'Icon buttons are the most common tooltip trigger and need a tooltip or label.' },
    { label: 'Button', text: 'Rich tooltip actions follow button styles.' },
  ],
};

export default tooltip;
