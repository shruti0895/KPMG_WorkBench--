import React from 'react';
import { Controls, Primary, Source, Stories, useOf } from '@storybook/addon-docs/blocks';
import { LIVE_DEMO_BASE_URL } from './config';
import { componentDocs } from './content';

/**
 * Component docs page following the KPMG WorkBench documentation guidelines:
 *
 *   1.   Component name (32px)
 *   1.a  Usage Guideline link  -> Live Demo site (14px)
 *   1.b  Accessibility link    -> Live Demo site (14px)
 *   2.   Table of Contents (24px) - built from the sections this component has
 *   2.a  Overview  - what it is, a live example, when to use it, anatomy
 *   2.b  Variants  - supported configurations (the stories)
 *   2.c  API       - props, events, accessibility
 *   2.d  Guides    - optional short how-tos (per component, in content/<name>.ts)
 *   3.   References (24px)
 *
 * (Feedback intentionally omitted — struck out in the guidelines.)
 * Used by both the React and Angular Storybooks via `parameters.docs.page`;
 * `parameters.kpmgFramework` picks which code sample a guide shows.
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

const subHeading = (label: string, id?: string) =>
  h('h3', { id, style: { fontFamily: font, fontSize: 16, fontWeight: 600, color: heading, margin: '24px 0 8px', scrollMarginTop: 16 } }, label);

const body = { fontFamily: font, fontSize: 14, lineHeight: '22px', color: text, margin: '0 0 8px' } as const;
const list = { ...body, paddingLeft: 24 } as const;

interface TocEntry {
  id: string;
  label: string;
  children?: TocEntry[];
}

export function GuidelinePage() {
  const meta = useOf('meta') as {
    preparedMeta: { title: string; parameters?: { kpmgFramework?: 'react' | 'angular' } };
    csfFile?: { stories?: Record<string, unknown> };
  };
  const name = meta.preparedMeta.title.split('/').pop() ?? '';
  const framework = meta.preparedMeta.parameters?.kpmgFramework ?? 'react';
  const storyCount = Object.keys(meta.csfFile?.stories ?? {}).length;
  const slug = slugify(name);
  const doc = componentDocs[name];
  const guides = doc?.guides ?? [];
  const demo = (hash: string) => `${LIVE_DEMO_BASE_URL}/${slug}#${hash}`;

  const externalLink = (label: string, hash: string) =>
    h('a', { href: demo(hash), target: '_blank', rel: 'noreferrer', style: { fontFamily: font, fontSize: 14, color: link, textDecoration: 'underline' } }, label);

  const toc: TocEntry[] = [
    {
      id: 'overview',
      label: 'Overview',
      children: doc
        ? [
            { id: 'overview-when', label: 'When to use' },
            { id: 'overview-anatomy', label: 'Anatomy' },
          ]
        : [],
    },
    { id: 'variants', label: 'Variants' },
    {
      id: 'api',
      label: 'API',
      children: [
        { id: 'api-props', label: 'Props & events' },
        { id: 'api-accessibility', label: 'Accessibility' },
      ],
    },
    ...(guides.length
      ? [{ id: 'guides', label: 'Guides', children: guides.map((g) => ({ id: `guide-${g.id}`, label: g.title })) }]
      : []),
    { id: 'references', label: 'References' },
  ];

  const tocLink = (t: TocEntry) =>
    h('a', { href: `#${t.id}`, onClick: scrollTo(t.id), style: { color: link } }, t.label);

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
      'ul',
      { style: list },
      toc.map((t) =>
        h(
          'li',
          { key: t.id },
          tocLink(t),
          t.children?.length
            ? h('ul', { style: { ...list, margin: '4px 0' } }, t.children.map((c) => h('li', { key: c.id }, tocLink(c))))
            : null,
        ),
      ),
    ),

    // 2.a Overview
    sectionHeading('overview', 'Overview', 20),
    doc ? h('p', { style: body }, doc.overview.what) : h('p', { style: body }, 'Overview coming soon.'),
    // Live example: the component's first story
    h(Primary, null),
    doc
      ? h(
          React.Fragment,
          null,
          subHeading('When to use', 'overview-when'),
          h('ul', { style: list }, doc.overview.when.map((w, i) => h('li', { key: i }, w))),
          subHeading('Anatomy', 'overview-anatomy'),
          h(
            'ol',
            { style: list },
            doc.overview.anatomy.map((a, i) => h('li', { key: i }, h('strong', null, a.part), ` — ${a.description}`)),
          ),
        )
      : null,

    // 2.b Variants (the first story is already shown under Overview)
    sectionHeading('variants', 'Variants', 20),
    h('p', { style: body }, 'Supported configurations of the component.'),
    h(Stories, { title: '', includePrimary: storyCount <= 1 }),

    // 2.c API
    sectionHeading('api', 'API', 20),
    h('p', { style: body }, 'Props, events and accessibility.'),
    subHeading('Props & events', 'api-props'),
    h(Controls, null),
    subHeading('Accessibility', 'api-accessibility'),
    doc
      ? h('ul', { style: list }, doc.accessibility.map((a, i) => h('li', { key: i }, a)))
      : h('p', { style: body }, 'Accessibility notes coming soon.'),

    // 2.d Guides
    guides.length ? sectionHeading('guides', 'Guides', 20) : null,
    ...guides.map((g) => {
      const code = g.code?.[framework];
      return h(
        'div',
        { key: g.id },
        subHeading(g.title, `guide-${g.id}`),
        ...g.paragraphs.map((p, i) => h('p', { key: i, style: body }, p)),
        code ? h(Source, { code, language: framework === 'react' ? 'jsx' : 'typescript', dark: true }) : null,
        g.note
          ? h('p', { style: { ...body, padding: '8px 12px', borderLeft: '4px solid var(--color-blue-300, #2f3de3)', background: 'var(--color-blue-900, #f5f5fe)' } }, g.note)
          : null,
      );
    }),

    // 3. References
    sectionHeading('references', 'References', 24),
    doc
      ? h('ul', { style: list }, doc.references.map((r, i) => h('li', { key: i }, h('strong', null, r.label), ` — ${r.text}`)))
      : h('p', { style: body }, 'References coming soon.'),
  );
}
