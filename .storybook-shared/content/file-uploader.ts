import type { ComponentDoc } from '../types';

export const fileUploader: ComponentDoc = {
  overview: {
    what:
      'A file uploader is a drop zone that lets users add files by dragging them onto it or by browsing their device. It comes in three sizes (small, medium, large) and outline or filled styles.',
    when: [
      'Let users attach one or more files to a form, record or conversation.',
      'Use the large size for a primary upload area and the small size inside compact forms.',
      'Provide subtext to state accepted file types and size limits.',
      'Avoid it for a simple attach action inside a toolbar; use an icon button instead.',
      'The uploader only reports the selected files; show upload progress separately with a progress indicator.',
    ],
    anatomy: [
      { part: 'Container', description: 'Dashed or filled drop zone that highlights while a file is dragged over it.' },
      { part: 'Icon', description: 'Upload arrow, or an illustration in the large size; can be replaced with a custom icon.' },
      { part: 'Prompt', description: 'Label text followed by a highlighted browse link.' },
      { part: 'Subtext', description: 'Optional supporting text, such as accepted formats.' },
      { part: 'File input', description: 'Hidden native file input that opens the system file picker.' },
    ],
  },
  accessibility: [
    'The drop zone has role="button" and is focusable with Tab (tabIndex 0); activating it opens the file picker.',
    'When disabled, it is removed from the tab order (tabIndex -1), sets aria-disabled and ignores clicks and drops.',
    'Dragging and dropping is optional: the same files can always be chosen with the browse action and the native file picker.',
    'The icon and the hidden file input are hidden from assistive technology (aria-hidden).',
    'Drag-over state is shown by a visual change only; confirm the selected files in text elsewhere on the page.',
  ],
  references: [
    { label: 'ProgressIndicator', text: 'Show upload progress after files are selected.' },
    { label: 'Chip', text: 'Input chips can list the attached files and allow removal.' },
    { label: 'IconButton', text: 'Use an icon button for a compact attach action.' },
  ],
};

export default fileUploader;
