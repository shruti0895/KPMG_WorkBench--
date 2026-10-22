import React from 'react';
import { Controls, Stories, useOf } from '@storybook/addon-docs/blocks';
import { LIVE_DEMO_BASE_URL } from './config';
import { componentDocs } from './content';

/**
 * Component docs page following the KPMG WorkBench documentation guidelines:
 *
 *   1.   Component name (32px)
 *   1.a  Usage Guideline link  -> Live Demo site (14px)
 *   1.b  Accessibility link    -> Live Demo site (14px)
 *   2.   Table of Contents (24px)
 *   2.a  Overview  - what it is, when to use it, anatomy
 *   2.b  Variants  - supported configurations (the stories)
 *   2.c  API       - props, events, accessibility
 *   3.   References (24px)
 *
 * (Feedback section intentionally omitted — struck out in the guidelines.)
 * Used by both the React and Angular Storybooks via `parameters.docs.page`.
 */
const h = React.createElement;

const font = "var(--font-family-base, 'Open Sans', sans-serif)";
const text = 'var(--color-neutral-100, #454554)';
const heading = 'var(--color-neutral-000, #2f2f39)';
const link = 'var(--color-blue-300, #2f3de3)';

const slugify = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const scrollTo = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const sectionHeading = (id: string, label: string, size: number) =>
  h('h2', { id, style: { fontFamily: font, fontSize: size, fontWeight: 600, color: heading, margin: '40px 0 12px', scrollMarginTop: 16 } }, label);

const subHeading = (label: string) =>
  h('h3', { style: { fontFamily: font, fontSize: 16, fontWeight: 600, color: heading, margin: '24px 0 8px' } }, label);

const body = { fontFamily: font, fontSize: 14, lineHeight: '22px', color: text, margin: '0 0 8px' } as const;
const list = { ...body, paddingLeft: 24 } as const;

export function GuidelinePage() {
  const meta = useOf('meta') as { preparedMeta: { title: string } };
  const name = meta.preparedMeta.title.split('/').pop() ?? '';
  const slug = slugify(name);
  const doc = componentDocs[name];
  const demo = (hash: string) => `${LIVE_DEMO_BASE_URL}/${slug}#${hash}`;

  const externalLink = (label: string, hash: string) =>
    h('a', { href: demo(hash), target: '_blank', rel: 'noreferrer', style: { fontFamily: font, fontSize: 14, color: link, textDecoration: 'underline' } }, label);

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'variants', label: 'Variants' },
    { id: 'api', label: 'API' },
  ];

  return h(
    'div',
    { style: { fontFamily: font, color: text, maxWidth: 1100 } },
    // 1. Component name
    h('h1', { style: { fontFamily: font, fontSize: 32, fontWeight: 700, color: heading, margin: '0 0 8px' } }, name),
    // 1.a / 1.b
    h('div', { style: { display: 'flex', gap: 24, marginBottom: 24 } }, externalLink('Usage Guideline', 'usage-guideline'), externalLink('Accessibility', 'accessibility')),

    // 2. Table of Contents
    h('h2', { style: { fontFamily: font, fontSize: 24, fontWeight: 600, color: heading, margin: '24px 0 8px' } }, 'Table of Contents'),
    h(
      'ol',
      { style: { ...list, listStyleType: 'lower-alpha' } },
      toc.map((t) => h('li', { key: t.id }, h('a', { href: `#${t.id}`, onClick: scrollTo(t.id), style: { color: link } }, t.label))),
    ),

    // 2.a Overview
    sectionHeading('overview', 'Overview', 20),
    doc
      ? h(
          React.Fragment,
          null,
          h('p', { style: body }, doc.overview.what),
          subHeading('When to use'),
          h('ul', { style: list }, doc.overview.when.map((w, i) => h('li', { key: i }, w))),
          subHeading('Anatomy'),
          h(
            'ol',
            { style: list },
            doc.overview.anatomy.map((a, i) => h('li', { key: i }, h('strong', null, a.part), ` — ${a.description}`)),
          ),
        )
      : h('p', { style: body }, 'Overview coming soon.'),

    // 2.b Variants
    sectionHeading('variants', 'Variants', 20),
    h('p', { style: body }, 'Supported configurations of the component.'),
    h(Stories, { title: '', includePrimary: true }),

    // 2.c API
    sectionHeading('api', 'API', 20),
    h('p', { style: body }, 'Props, events and accessibility.'),
    subHeading('Props & events'),
    h(Controls, null),
    subHeading('Accessibility'),
    doc
      ? h('ul', { style: list }, doc.accessibility.map((a, i) => h('li', { key: i }, a)))
      : h('p', { style: body }, 'Accessibility notes coming soon.'),

    // 3. References
    sectionHeading('references', 'References', 24),
    doc
      ? h('ul', { style: list }, doc.references.map((r, i) => h('li', { key: i }, h('strong', null, r.label), ` — ${r.text}`)))
      : h('p', { style: body }, 'References coming soon.'),
  );
}
