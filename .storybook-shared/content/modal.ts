import type { ComponentDoc } from '../types';

export const modal: ComponentDoc = {
  overview: {
    what:
      'A modal is a dialog that appears over the page and asks the user to complete a task or make a decision before continuing. The WorkBench modal is a multi-step form layout with a header, optional modules, and Back and Next actions.',
    when: [
      'Collect focused input in a step-by-step flow, such as creating an assistant.',
      'Combine modules as needed: progress, agent preview, text inputs, file drop zone, prompt templates and model or voice selection.',
      'Use the inline option to show the dialog in the page flow, for example in documentation.',
    ],
    whenNot: [
      "Brief confirmations or notices: use a snackbar or banner instead.",
      "Content users need to see alongside the page: use a sheet instead.",
      "Small, non-blocking inputs or choices: use a menu instead.",
    ],
    anatomy: [
      { part: 'Overlay', description: 'Backdrop behind the dialog; clicking it calls onClose.' },
      { part: 'Header', description: 'Title and a close button, followed by a divider.' },
      { part: 'Progress', description: 'Optional linear progress indicator for the current step.' },
      { part: 'Body modules', description: 'Optional agent card, inputs, file drop zone, prompt list and selection card grids.' },
      { part: 'Footer', description: 'Outlined Back button and filled Next button.' },
    ],
  },
  variants: [
    { name: "Overlay (default)", purpose: "Shown over the page with a backdrop. It blocks the page and closes on Escape, a click on the backdrop or the close button. Use it for real dialogs." },
    { name: "Inline", purpose: "Rendered in the page flow with no backdrop and no Escape handling. Use it only for documentation and previews." },
    { name: "With progress", purpose: "Adds a linear progress bar under the header to show the current step of a flow." },
    { name: "Body modules", purpose: "Agent preview, name and purpose inputs, file drop zone, prompt templates and model or voice cards. Turn on only the modules a step needs." },
    { name: "With or without footer", purpose: "The footer has Back and Next buttons with editable labels. Hide it when the dialog needs no step actions." },
  ],
  formatting: [
    {
      title: "Sizing",
      points: [
        "The dialog is 700px wide and never wider than the viewport minus 32px. The body scrolls when the content is taller than the dialog.",
      ],
    },
    {
      title: "Content",
      points: [
        "Write a title that names the task. It is truncated with an ellipsis if it is too long.",
        "Use short button labels such as \"Next\" and \"Back\" or a verb that names the result.",
        "Keep each step to a few modules; split longer flows across steps and update the progress value for each step.",
      ],
    },
    {
      title: "Placement",
      points: [
        "Open a modal from a button the user pressed, and close it from the same flow. The modal does not manage its own visibility.",
      ],
    },
  ],
  behaviors: [
    {
      title: "Mouse and touch",
      points: [
        "The close button and a click on the backdrop call onClose. A click inside the dialog does not.",
        "Back and Next call onBack and onNext; the modal does not track the current step.",
        "The file drop zone accepts dropped files or opens the file browser on click, and each added file has a remove button.",
        "Model and voice cards select one card at a time.",
      ],
    },
    {
      title: "Keyboard and focus",
      points: [
        "Escape calls onClose when the modal is shown over the page.",
        "Focus is not moved into the dialog, trapped or restored; manage it in the application.",
        "The drop zone is focusable; Enter and Space on it are not handled by the modal.",
      ],
    },
  ],
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
