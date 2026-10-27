import type { ComponentDoc } from '../types';

export const accordion: ComponentDoc = {
  overview: {
    what:
      'An accordion is a vertical list of headings that each show or hide a panel of related content. It lets people scan a long page by its headings and open only the parts they need. Items open and close independently, so several can be open at the same time.',
    when: [
      'Break a long page or form into sections that people can scan and open one at a time, such as a setup checklist or an FAQ.',
      'Show supporting detail that most people do not need to read, without leaving the page.',
      'Keep the page short on small screens by collapsing secondary content.',
    ],
    whenNot: [
      'Do not use an accordion to switch between peer views of the same content; use Tab instead.',
      'Do not hide content that most people need to read to finish the task; show it on the page.',
      'Do not use an accordion for a list of actions or choices; use a Menu instead.',
      'Do not use an accordion for a flat list of rows with no hidden content; use List instead.',
      'Do not use an accordion for tabular data that people compare across rows; use Sheets or DataTable instead.',
      'Do not use an accordion to show a short message or form in front of the page; use a Modal instead.',
    ],
    anatomy: [
      { part: 'Accordion', description: 'The container. It is a list, sets the size and chevron alignment for all items, and can disable them all.' },
      { part: 'Item', description: 'One heading and its panel, separated from the next item by a border.' },
      { part: 'Heading', description: 'A button that opens and closes the panel. It shows the title and the chevron.' },
      { part: 'Title', description: 'Text or other content that names the panel.' },
      { part: 'Chevron', description: 'Icon that points down when closed and up when open (right and down when the chevron is at the start).' },
      { part: 'Panel', description: 'The content that is shown when the item is open. It is a labelled region.' },
    ],
  },
  variants: [
    { name: 'Default', purpose: 'Chevron at the end of the heading, with padding on both sides. Use it for most accordions.' },
    { name: 'Align start', purpose: 'Chevron before the title (align start), and the panel text lines up with the title. Use it only when the chevron must sit next to the text; do not use it to build a tree view or nested accordions.' },
    { name: 'Flush', purpose: 'Removes the horizontal padding (isFlush) so the title and panel text line up with the content around the accordion. It has no effect when align is start.' },
    { name: 'Sizes', purpose: 'Small, medium (default) and large headings that are 32, 40 and 48px tall. Use small in dense layouts and large when the accordion is the main content.' },
    { name: 'Disabled', purpose: 'A single item can be disabled, or the whole accordion. Disabled headings are dimmed and cannot be focused or opened.' },
    { name: 'Skeleton', purpose: 'A loading placeholder with grey bars instead of text. Use it while the real content is being fetched.' },
  ],
  formatting: [
    {
      title: 'Sizing',
      points: [
        'The accordion fills the width of its container. Set the width on the container, not on the accordion.',
        'Choose the size with size: sm (32px), md (40px, the default) or lg (48px). The size applies to every heading and is the minimum height, so long titles wrap and the heading grows.',
      ],
    },
    {
      title: 'Content',
      points: [
        'Write titles that name what is inside the panel, in a few words. People decide whether to open an item from its title alone.',
        'The title can be plain text or any content (a node in React, a titleTemplate or an accordionTitle element in Angular). Do not put buttons or links in the title: the heading is already a button.',
        'The panel can hold any content. Keep each panel short; if a panel needs scrolling, link to a page instead.',
      ],
    },
    {
      title: 'Layout',
      points: [
        'Items are stacked with a border between them and one under the last item. The corners are square.',
        'The chevron is at the end by default. Use align start only where the chevron needs to sit next to the text, and use isFlush when the accordion sits directly on the page background beside other flush content.',
        'Use one size and one alignment for all the items in an accordion.',
      ],
    },
  ],
  behaviors: [
    {
      title: 'Mouse and touch',
      points: [
        'Clicking or tapping anywhere on a heading opens the item if it is closed and closes it if it is open. Items do not affect each other.',
        'Headings get a light background on hover. The chevron turns to show the new state.',
        'Clicking a disabled heading does nothing.',
      ],
    },
    {
      title: 'Keyboard and focus',
      points: [
        'Each heading is a button that is reached with Tab. Enter or Space opens and closes it.',
        'A focus ring is drawn inside the heading for keyboard focus.',
        'Disabled headings are skipped in the Tab order.',
      ],
    },
    {
      title: 'States',
      points: [
        'Each item works uncontrolled (defaultOpen sets the starting state) or controlled (open). In React a controlled item changes only when you update open from onHeadingClick; in Angular bind [(open)].',
        'onHeadingClick (the (headingClick) output in Angular) receives { isOpen, event } where isOpen is the state the item is moving to. It is not called for disabled items.',
        'Closed panels stay in the page but are hidden, so their content keeps its state.',
        'Disabled items are dimmed and cannot be toggled. Setting disabled on the accordion disables every item.',
      ],
    },
  ],
  accessibility: [
    'The accordion is a list and each item is a list item.',
    'Each heading is a native button with aria-expanded set to true when the panel is open and false when it is closed, and aria-controls pointing at its panel.',
    'Each panel has role="region" and aria-labelledby pointing at its heading, so a screen reader announces the title with the content.',
    'Enter and Space toggle the item through the native button. No custom key handling is needed.',
    'Disabled headings use the native disabled attribute: they are not focusable and are not announced as actionable.',
    'The chevron is decorative and hidden from assistive technology.',
    'Do not put interactive content, such as links or buttons, inside the heading. It is already a button, and nested controls are not accessible.',
    'The skeleton sets aria-busy="true" and an accessible label of "Loading".',
  ],
  guides: [
    {
      id: 'controlled',
      title: 'Controlling which items are open',
      paragraphs: [
        'Pass open to take control of an item. In React the item then only reports clicks through onHeadingClick({ isOpen, event }); store isOpen yourself and pass it back as open. In Angular bind [(open)] on each item.',
        'This is how you build Open all and Close all buttons: keep one open flag per item and set them all at once. Leave open out and use defaultOpen if you only need the starting state.',
      ],
      code: {
        react: `import { useState } from 'react';
import { Accordion, AccordionItem } from '@designkpmg/ui/components/Accordion';
import { Button } from '@designkpmg/ui/components/Button/Button';

const titles = ['Choose your plan', 'Add team members'];

export function Example() {
  const [open, setOpen] = useState(titles.map(() => false));

  return (
    <>
      <Button onClick={() => setOpen(titles.map(() => true))}>Open all</Button>
      <Button onClick={() => setOpen(titles.map(() => false))}>Close all</Button>
      <Accordion>
        {titles.map((title, index) => (
          <AccordionItem
            key={title}
            title={title}
            open={open[index]}
            onHeadingClick={({ isOpen }) =>
              setOpen((prev) => prev.map((v, i) => (i === index ? isOpen : v)))
            }
          >
            Panel content
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}`,
        angular: `import { Component } from '@angular/core';
import { AccordionComponent, AccordionItemComponent, ButtonComponent } from '@designkpmg/angular';

@Component({
  selector: 'app-example',
  imports: [AccordionComponent, AccordionItemComponent, ButtonComponent],
  template: \`
    <kpmg-button (click)="setAll(true)">Open all</kpmg-button>
    <kpmg-button (click)="setAll(false)">Close all</kpmg-button>
    <kpmg-accordion>
      <kpmg-accordion-item title="Choose your plan" [(open)]="open[0]">Panel content</kpmg-accordion-item>
      <kpmg-accordion-item title="Add team members" [(open)]="open[1]">Panel content</kpmg-accordion-item>
    </kpmg-accordion>
  \`,
})
export class Example {
  open = [false, false];
  setAll(value: boolean) {
    this.open = this.open.map(() => value);
  }
}`,
      },
      note: 'In Angular, the (headingClick) output also gives you { isOpen, event } if you need to react to a click without binding open.',
    },
    {
      id: 'align-flush',
      title: 'Alignment, size and flush layout',
      paragraphs: [
        'Set align="start" to put the chevron before the title, isFlush to remove the horizontal padding, and size to sm, md or lg. These are set once on the accordion and apply to all its items. isFlush has no effect when align is start.',
        'In Angular the heading can also be rich content: use the titleTemplate input with an ng-template, or put an element with the accordionTitle attribute inside the item.',
      ],
      code: {
        react: `<Accordion align="start" size="lg">
  <AccordionItem title="Panel A">Panel A content</AccordionItem>
  <AccordionItem title={<strong>Panel B</strong>}>Panel B content</AccordionItem>
</Accordion>

<Accordion isFlush size="sm">
  <AccordionItem title="Panel C">Panel C content</AccordionItem>
</Accordion>`,
        angular: `<kpmg-accordion align="start" size="lg">
  <kpmg-accordion-item title="Panel A">Panel A content</kpmg-accordion-item>
  <kpmg-accordion-item>
    <strong accordionTitle>Panel B</strong>
    Panel B content
  </kpmg-accordion-item>
</kpmg-accordion>

<kpmg-accordion isFlush size="sm">
  <kpmg-accordion-item title="Panel C">Panel C content</kpmg-accordion-item>
</kpmg-accordion>`,
      },
    },
    {
      id: 'skeleton',
      title: 'Showing a loading state',
      paragraphs: [
        'Render the skeleton in place of the accordion while its content loads. count sets how many headings to show (4 by default) and open expands the first one with placeholder lines (on by default). align and isFlush match the accordion so the layout does not jump when the real content appears.',
      ],
      code: {
        react: `import { Accordion, AccordionItem, AccordionSkeleton } from '@designkpmg/ui/components/Accordion';

{loading ? (
  <AccordionSkeleton count={3} open={false} />
) : (
  <Accordion>{/* items */}</Accordion>
)}`,
        angular: `@if (loading()) {
  <kpmg-accordion-skeleton [count]="3" [open]="false" />
} @else {
  <kpmg-accordion><!-- items --></kpmg-accordion>
}`,
      },
    },
  ],
  references: [
    { label: 'Tab', text: 'Use tabs to switch between peer views that share the same space.' },
    { label: 'Menu', text: 'Use a menu for a list of actions or choices rather than hidden content.' },
    { label: 'List', text: 'Use a list for rows that do not hide content.' },
    { label: 'Sheets', text: 'Use sheets for tables and grids of data that people compare.' },
    { label: 'Modal', text: 'Use a modal for content that needs the user\'s attention before they continue.' },
  ],
};

export default accordion;
