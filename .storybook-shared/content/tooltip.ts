import type { ComponentDoc } from '../types';

export const tooltip: ComponentDoc = {
  overview: {
    what:
      'A tooltip shows short, supplementary information next to the element it describes. It comes as a small or large plain tooltip, a rich tooltip with a title, text and actions, or a menu, in elevated or filled style with an optional caret.',
    when: [
      'Small and large tooltips: name an icon-only control or explain a term in a few words.',
      'Rich tooltips: give a title, a short description and up to a few actions.',
      'Menu type: show a short checklist or list of items from a trigger.',
      'Avoid tooltips for essential information, because it is hidden until the user hovers or focuses the trigger.',
      'Avoid long content or complex interaction; use a sheet or a modal instead.',
    ],
    anatomy: [
      { part: 'Trigger', description: 'The wrapped element the tooltip describes.' },
      { part: 'Container', description: 'Elevated or filled surface, placed at the top, bottom, left or right with a chosen alignment.' },
      { part: 'Caret', description: 'Optional pointer in small, medium or large size that connects the tooltip to the trigger.' },
      { part: 'Title and text', description: 'Short text, or in rich tooltips a title, description and optional secondary text after a divider.' },
      { part: 'Actions or items', description: 'Buttons in rich tooltips, or menu items in the menu type.' },
    ],
  },
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
