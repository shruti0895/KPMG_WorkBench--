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

  guides: [
    {
      id: 'open-close',
      title: 'Opening and closing the modal',
      paragraphs: [
        'The modal does not manage its own visibility. Show it by setting isOpen, and hide it by setting isOpen to false in your close handler (onClose in React, the (modalClose) output in Angular). When isOpen is false the modal renders nothing.',
        'The close handler is called when the user presses the close button, presses Escape, or clicks the overlay. To keep the modal open for one of these, do not change the open state in the handler.',
      ],
      code: {
        react: `import { useState } from 'react';
import { Modal } from '@designkpmg/ui/components/Modal';
import { Button } from '@designkpmg/ui/components/Button/Button';

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Create an assistant" />
    </>
  );
}`,
        angular: `import { Component, signal } from '@angular/core';
import { ButtonComponent, ModalComponent } from '@designkpmg/angular';

@Component({
  selector: 'app-example',
  imports: [ButtonComponent, ModalComponent],
  template: \`
    <kpmg-button (click)="open.set(true)">Open modal</kpmg-button>
    <kpmg-modal [isOpen]="open()" (modalClose)="open.set(false)" title="Create an assistant" />
  \`,
})
export class Example {
  open = signal(false);
}`,
      },
    },
    {
      id: 'inline',
      title: 'Showing the modal inline',
      paragraphs: [
        'Set inline to render the modal in the normal page flow, without the overlay. Inline modals do not close on Escape and report aria-modal as false. Use this for documentation and previews, not for real dialogs.',
      ],
      code: {
        react: `<Modal inline title="Create an assistant" />`,
        angular: `<kpmg-modal inline title="Create an assistant" />`,
      },
    },
    {
      id: 'steps',
      title: 'Multi-step flows: progress and footer',
      paragraphs: [
        'Turn on withProgress and set progress (0 to 100) to show the linear progress bar for the current step. Use backLabel and nextLabel to rename the footer buttons, and handle the Back and Next buttons with onBack and onNext in React, or the (back) and (next) outputs in Angular. Set showFooter to false to hide the footer.',
      ],
      code: {
        react: `<Modal
  isOpen={open}
  title="Create an assistant"
  withProgress
  progress={60}
  backLabel="Previous"
  nextLabel="Continue"
  onBack={() => setStep(step - 1)}
  onNext={() => setStep(step + 1)}
  onClose={() => setOpen(false)}
/>`,
        angular: `<kpmg-modal
  [isOpen]="open()"
  title="Create an assistant"
  withProgress
  [progress]="60"
  backLabel="Previous"
  nextLabel="Continue"
  (back)="step.update(s => s - 1)"
  (next)="step.update(s => s + 1)"
  (modalClose)="open.set(false)"
/>`,
      },
      note: 'The modal does not track the current step. Update progress and the module props yourself as the user moves between steps.',
    },
    {
      id: 'modules',
      title: 'Choosing the modules in the body',
      paragraphs: [
        'The body is built from optional modules, each turned on with its own prop: agentModule (assistant preview card), inputModule1 (name), inputModule2 (purpose), fileUploaderModule (knowledge base), inputModule3 (prompt templates), cardModule1 (model selection) and cardModule2 (voice selection). Combine the ones a step needs.',
      ],
      code: {
        react: `<Modal isOpen title="Add knowledge" inputModule2 fileUploaderModule />`,
        angular: `<kpmg-modal title="Add knowledge" inputModule2 fileUploaderModule />`,
      },
    },
    {
      id: 'focus',
      title: 'Managing focus',
      paragraphs: [
        'The modal does not move focus into the dialog, keep focus inside it, or return focus to the button that opened it. Your application should do this:',
        '1. When the modal opens, move focus to the first field or the close button.',
        '2. While it is open, keep Tab and Shift+Tab inside the dialog.',
        '3. When it closes, return focus to the element that opened it.',
      ],
    },
  ],
  references: [
    { label: 'ProgressIndicator', text: 'The progress module uses the linear progress indicator.' },
    { label: 'FileUploader', text: 'The file module follows the file uploader pattern.' },
    { label: 'Sheets', text: 'Use a sheet for supplementary content shown beside the page.' },
    { label: 'Button', text: 'Back and Next actions follow the button pattern.' },
  ],
};

export default modal;
