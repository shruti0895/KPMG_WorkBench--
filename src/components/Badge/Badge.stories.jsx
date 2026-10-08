import React, { useState } from 'react';
import { Badge } from './Badge';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';

const BellSvg = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
  </svg>
);

const MailSvg = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - Badge Component

The Badge component provides compact visual feedback, notification indicators, and numeric count tags.
Supports all 12 design system variants:
- **3 Sizes**: Small, Medium, Large
- **2 Color Styles**: Primary (brand blue), Neutral (grayscale)
- **2 States / Intensities**: Quiet (subtle container fill), Loud (high contrast fill)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the badge',
    },
    styleType: {
      control: 'select',
      options: ['primary', 'neutral'],
      description: 'Color theme palette',
    },
    state: {
      control: 'select',
      options: ['quiet', 'loud'],
      description: 'Visual intensity',
    },
    count: {
      control: 'number',
      description: 'Numeric value to display',
    },
    maxCount: {
      control: 'number',
      description: 'Threshold above which ${maxCount}+ is rendered',
    },
    dot: {
      control: 'boolean',
      description: 'Renders badge as empty dot indicator',
    },
    placement: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      description: 'Corner placement when anchoring to children',
    },
  },
};

/**
 * 1. Default Interactive Playground
 */
export const Default = {
  args: {
    size: 'medium',
    styleType: 'primary',
    state: 'loud',
    count: 5,
    maxCount: 99,
    dot: false,
  },
  render: (args) => (
    <div style={{ padding: 'var(--spacing-6, 24px)' }}>
      <Badge {...args} />
    </div>
  ),
};

/**
 * 2. Complete 12 Variants Matrix
 * 3 Sizes (Small, Medium, Large) × 2 Styles (Primary, Neutral) × 2 States (Quiet, Loud) = 12 Variants
 */
export const Complete12VariantsMatrix = {
  render: () => {
    const sizes = [
      { id: 'small', label: 'Small (6px Dot)', sample: null },
      { id: 'medium', label: 'Medium (16px)', sample: '12' },
      { id: 'large', label: 'Large (24px)', sample: '99+' },
    ];

    const variants = [
      { style: 'neutral', state: 'quiet', title: 'Neutral Quiet' },
      { style: 'neutral', state: 'loud', title: 'Neutral Loud' },
      { style: 'primary', state: 'quiet', title: 'Primary Quiet' },
      { style: 'primary', state: 'loud', title: 'Primary Loud' },
    ];

    return (
      <div style={{ padding: 'var(--spacing-6, 24px)' }}>
        <h3
          style={{
            fontSize: 'var(--font-size-title-lg, 18px)',
            fontWeight: 'var(--font-weight-semibold, 600)',
            color: 'var(--color-on-surface, #2f2f39)',
            marginBottom: 'var(--spacing-2, 8px)',
          }}
        >
          All 12 Badge Variants Matrix
        </h3>
        <p
          style={{
            fontSize: 'var(--font-size-body-sm, 12px)',
            color: 'var(--color-on-surface-light, #9090a2)',
            marginBottom: 'var(--spacing-6, 24px)',
          }}
        >
          Complete design system matrix showing 3 Sizes across Neutral and Primary color styles in Quiet and Loud states.
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              maxWidth: '800px',
              borderCollapse: 'collapse',
              border: '1px solid var(--color-neutral-600, #e3e3e8)',
              borderRadius: 'var(--radius-md, 12px)',
              overflow: 'hidden',
              backgroundColor: 'var(--color-surface, #ffffff)',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: 'var(--color-surface-light, #f7f7f8)', borderBottom: '2px solid var(--color-neutral-600, #e3e3e8)' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', color: 'var(--color-on-surface, #2f2f39)' }}>
                  Variant (Style &bull; State)
                </th>
                {sizes.map((s) => (
                  <th key={s.id} style={{ padding: '12px 16px', textAlign: 'center', fontSize: '13px', color: 'var(--color-on-surface, #2f2f39)' }}>
                    {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {variants.map((v) => (
                <tr
                  key={`${v.style}-${v.state}`}
                  style={{ borderBottom: '1px solid var(--color-neutral-700, #f1f1f3)' }}
                >
                  <td style={{ padding: '16px', fontWeight: 500, fontSize: '13px', color: 'var(--color-on-surface, #2f2f39)' }}>
                    {v.title}
                  </td>
                  {sizes.map((s) => (
                    <td key={s.id} style={{ padding: '16px', textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Badge
                          size={s.id}
                          styleType={v.style}
                          state={v.state}
                          count={s.sample}
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
};

/**
 * 3. Overlapping Badges on Buttons & Icons
 */
export const OverlappingBadges = {
  render: () => {
    const [unreadCount, setUnreadCount] = useState(3);

    return (
      <div style={{ padding: 'var(--spacing-6, 24px)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6, 24px)' }}>
        <div>
          <h3 style={{ fontSize: 'var(--font-size-title-lg, 18px)', fontWeight: 'var(--font-weight-semibold, 600)', color: 'var(--color-on-surface, #2f2f39)', marginBottom: 'var(--spacing-2, 8px)' }}>
            Anchored Notification Badges
          </h3>
          <p style={{ fontSize: 'var(--font-size-body-sm, 12px)', color: 'var(--color-on-surface-light, #9090a2)', marginBottom: 'var(--spacing-4, 16px)' }}>
            Badges seamlessly wrap around interactive elements with automatic offset positioning.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6, 24px)', alignItems: 'center' }}>
          {/* Icon Button with Dot */}
          <Badge size="small" styleType="primary" state="loud" dot>
            <IconButton variant="outline" icon={<BellSvg />} aria-label="Notifications" />
          </Badge>

          {/* Icon Button with Count */}
          <Badge size="medium" styleType="primary" state="loud" count={unreadCount}>
            <IconButton variant="outline" icon={<MailSvg />} aria-label="Inbox" />
          </Badge>

          {/* Action Button with Large Badge */}
          <Badge size="large" styleType="primary" state="loud" count={12}>
            <Button variant="outline">Pending Approvals</Button>
          </Badge>

          {/* Neutral Quiet Badge on Action Button */}
          <Badge size="medium" styleType="neutral" state="quiet" count="New">
            <Button variant="secondary">Feature Preview</Button>
          </Badge>

          {/* Interactive Count Controller */}
          <div style={{ display: 'flex', gap: 'var(--spacing-2, 8px)', alignItems: 'center', marginLeft: 'auto' }}>
            <Button size="small" variant="outline" onClick={() => setUnreadCount((c) => Math.max(0, c - 1))}>
              - Decrement
            </Button>
            <Button size="small" variant="primary" onClick={() => setUnreadCount((c) => c + 1)}>
              + Increment
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * 4. Numeric Threshold & Overflow Demo
 */
export const NumericOverflow = {
  render: () => (
    <div style={{ padding: 'var(--spacing-6, 24px)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4, 16px)' }}>
      <h3 style={{ fontSize: 'var(--font-size-title-lg, 18px)', fontWeight: 'var(--font-weight-semibold, 600)', color: 'var(--color-on-surface, #2f2f39)' }}>
        Count Scaling &amp; Maximum Threshold
      </h3>
      <p style={{ fontSize: 'var(--font-size-body-sm, 12px)', color: 'var(--color-on-surface-light, #9090a2)' }}>
        Automatically scales from single-digit circle to multi-digit pill, formatting with + symbol when exceeding maxCount.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4, 16px)', alignItems: 'center' }}>
        <Badge size="medium" styleType="primary" state="loud" count={1} />
        <Badge size="medium" styleType="primary" state="loud" count={9} />
        <Badge size="medium" styleType="primary" state="loud" count={24} />
        <Badge size="medium" styleType="primary" state="loud" count={99} />
        <Badge size="medium" styleType="primary" state="loud" count={150} maxCount={99} />
        <Badge size="large" styleType="primary" state="loud" count={999} maxCount={99} />
        <Badge size="large" styleType="neutral" state="loud" count={500} maxCount={99} />
      </div>
    </div>
  ),
};
