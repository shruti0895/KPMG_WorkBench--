import type { ComponentDoc } from '../types';

export const fileUploader: ComponentDoc = {
  overview: {
    what:
      'A file uploader is a drop zone that lets users add files by dragging them onto it or by browsing their device. It comes in three sizes (small, medium, large) and outline or filled styles.',
    when: [
      'Let users attach one or more files to a form, record or conversation.',
      'Use the large size for a primary upload area and the small size inside compact forms.',
      'Provide subtext to state accepted file types and size limits.',
      'The uploader only reports the selected files; show upload progress separately with a progress indicator.',
    ],
    whenNot: [
      'A simple attach action in a toolbar or message field: use an IconButton or Button.',
      'Showing the files that were chosen: list them with Chips, a List or a DataTable.',
    ],
    anatomy: [
      { part: 'Container', description: 'Dashed or filled drop zone that highlights while a file is dragged over it.' },
      { part: 'Icon', description: 'Upload arrow, or an illustration in the large size; can be replaced with a custom icon.' },
      { part: 'Prompt', description: 'Label text followed by a highlighted browse link.' },
      { part: 'Subtext', description: 'Optional supporting text, such as accepted formats.' },
      { part: 'File input', description: 'Hidden native file input that opens the system file picker.' },
    ],
  },
  variants: [
    { name: 'Small', purpose: 'Compact drop zone with a small arrow icon. Use it inside forms and side panels.' },
    { name: 'Medium', purpose: 'Default drop zone with a standard arrow icon. Use it for most upload fields.' },
    { name: 'Large', purpose: 'Taller drop zone with an illustration. Use it when the upload is the main task of the page or dialog.' },
    { name: 'Outline', purpose: 'Dashed border, no fill. The default; use it on plain backgrounds.' },
    { name: 'Elevated', purpose: 'Tinted surface with a shadow that lifts slightly on hover.' },
    { name: 'Filled', purpose: 'Tinted fill with no border. Use it where a border would be too noisy.' },
  ],
  formatting: [
    {
      title: 'Content',
      points: [
        'Write the label as an instruction and the browse text as the action; they read as one sentence ("Drag and drop files or browse on computer").',
        'Use subtext to state accepted file types and the size limit, and match the accept prop to it.',
        'Set multiple to false when only one file is allowed.',
      ],
    },
    {
      title: 'Placement and sizing',
      points: [
        'Give the uploader the full width of its container rather than placing it inline with other controls.',
        'Show selected files and upload progress below the drop zone, not inside it.',
        'Use one size and style for all uploaders on a page.',
      ],
    },
  ],
  behaviors: [
    {
      title: 'Mouse and touch',
      points: [
        'Clicking anywhere on the drop zone opens the native file picker.',
        'Dragging files over the zone shows a dashed blue border and tinted background; dropping calls onDrop(event, files) and onFileSelect(files).',
        'Choosing files in the picker calls onFileSelect(files). The component does not check file types or sizes on drop; validate the files yourself.',
      ],
    },
    {
      title: 'Keyboard and focus',
      points: [
        'Tab focuses the drop zone and shows a focus ring.',
        'In the React component the drop zone has no Enter or Space handler, so the file picker cannot be opened from the keyboard through it; provide another way to attach files where keyboard access matters. The Angular component adds Enter and Space activation.',
      ],
    },
    {
      title: 'States',
      points: [
        'Hover changes the border, shadow or fill depending on the style.',
        'Disabled ignores clicks and drops, is dimmed and is removed from the tab order.',
        'The component keeps no list of files; it only reports them.',
      ],
    },
  ],
  accessibility: [
    'The drop zone has role="button" and is focusable with Tab (tabIndex 0); clicking it opens the file picker. Enter and Space also open it in the Angular component, but not in React.',
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
