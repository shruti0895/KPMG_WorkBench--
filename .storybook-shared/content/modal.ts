import type { ComponentDoc } from '../types';

export const modal: ComponentDoc = {
  overview: {
    what:
      'A modal is a dialog that appears over the page and asks the user to complete a task or make a decision before continuing. The WorkBench modal is a multi-step form layout with a header, optional modules, and Back and Next actions.',
    when: [
      'Collect focused input in a step-by-step flow, such as creating an assistant.',
      'Combine modules as needed: progress, agent preview, text inputs, file drop zone, prompt templates and model or voice selection.',
      'Use the inline option to show the dialog in the page flow, for example in documentation.',
      'Avoid it for brief confirmations or notices; use a snackbar or banner instead.',
      'Avoid it for content users need alongside the page; use a sheet instead.',
    ],
    anatomy: [
      { part: 'Overlay', description: 'Backdrop behind the dialog; clicking it calls onClose.' },
      { part: 'Header', description: 'Title and a close button, followed by a divider.' },
      { part: 'Progress', description: 'Optional linear progress indicator for the current step.' },
      { part: 'Body modules', description: 'Optional agent card, inputs, file drop zone, prompt list and selection card grids.' },
      { part: 'Footer', description: 'Outlined Back button and filled Next button.' },
    ],
  },
  accessibility: [
    'The dialog has role="dialog" and is labelled by its title through aria-labelledby.',
    'aria-modal is true when shown over the page and false when rendered inline.',
    'Pressing Escape calls onClose; clicking the overlay also does.',
    'The close button has aria-label "Close modal dialog", and icon buttons inside carry labels such as "Voice dictation for purpose" and "Remove file ...".',
    'The component does not move focus into the dialog, trap focus or restore it on close; manage focus in the host application.',
    'The file drop zone is focusable (role="button", tabIndex 0).',
  ],
  references: [
    { label: 'ProgressIndicator', text: 'The progress module uses the linear progress indicator.' },
    { label: 'FileUploader', text: 'The file module follows the file uploader pattern.' },
    { label: 'Sheets', text: 'Use a sheet for supplementary content shown beside the page.' },
    { label: 'Button', text: 'Back and Next actions follow the button pattern.' },
  ],
};

export default modal;
