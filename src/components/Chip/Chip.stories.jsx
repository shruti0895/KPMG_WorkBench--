import React, { useState } from 'react';
import {
  Chip,
  ChipCheckmarkSvg,
  ChipDismissSvg,
  ChipBrandedDocSvg,
  ChipStarSvg,
} from './Chip';

export default {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - Chip Component
The Chip family represents compact, interactive elements for input, filtering, recommendations, and actions.

        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['filter', 'input', 'assistive', 'suggestion'],
      description: 'Chip semantic role in UI',
    },
    styleType: {
      control: 'radio',
      options: ['outlined', 'elevated'],
      description: 'Visual treatment: 1px border vs elevation drop-shadow',
    },
    configuration: {
      control: 'select',
      options: [
        'Label only',
        'Label and leading icon',
        'Label and trailing icon',
        'Label and icons',
        'Icon only',
        'Label and leading branded icon',
        'Label and branded icons',
      ],
      description: 'Slot configuration layout',
    },
    selected: {
      control: 'boolean',
      description: 'Whether chip is in active selected state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user interaction and applies muted styling',
    },
    state: {
      control: 'select',
      options: [undefined, 'enabled', 'hovered', 'pressed', 'dragged', 'disabled'],
      description: 'Forced visual state for prototype inspection',
    },
    label: {
      control: 'text',
      description: 'Label text content',
    },
    isBranded: {
      control: 'boolean',
      description: 'Uses branded document/app icon for leading icon slot',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Renders in compact 40px icon-only layout',
    },
  },
};

/**
 * 1. Default Interactive Playground
 */
export const Default = {
  args: {
    type: 'filter',
    styleType: 'outlined',
    configuration: 'Label and icons',
    label: 'Label',
    selected: false,
    disabled: false,
    isBranded: false,
  },
  render: (args) => {
    const [isSelected, setIsSelected] = useState(args.selected);
    return (
      <div style={{ padding: '24px' }}>
        <Chip
          {...args}
          selected={isSelected}
          onClick={() => setIsSelected(!isSelected)}
        />
        <div style={{ marginTop: '16px', fontSize: '12px', color: '#9090a2' }}>
          Interactive state: {isSelected ? 'Selected (Active)' : 'Unselected'}
        </div>
      </div>
    );
  },
};

/**
 * 2. Complete 80 Variants Matrix for Filter Chips
 * 2 Styles (Outlined, Elevated) x 5 Configurations x 4 States x 2 Selected = 80 Variants
 */
export const FilterChips80VariantsMatrix = {
  render: () => {
    const styles = ['outlined', 'elevated'];
    const configs = [
      { name: 'Icon only', iconOnly: true, label: 'Icon' },
      { name: 'Label only', configuration: 'Label only', label: 'Label' },
      { name: 'Label & leading icon', configuration: 'Label and leading icon', label: 'Label' },
      { name: 'Label & trailing icon', configuration: 'Label and trailing icon', label: 'Label' },
      { name: 'Label and icons', configuration: 'Label and icons', label: 'Label' },
    ];
    const states = ['enabled', 'hovered', 'dragged', 'disabled'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', padding: '16px' }}>
        {styles.map((style) => (
          <div
            key={style}
            style={{
              border: '1px solid var(--color-neutral-600, #e3e3e8)',
              borderRadius: 'var(--radius-lg, 16px)',
              padding: 'var(--spacing-6, 24px)',
              backgroundColor: 'var(--color-surface-light, #fafafb)',
            }}
          >
            <h3
              style={{
                fontSize: 'var(--font-size-title-lg, 18px)',
                fontWeight: 'var(--font-weight-semibold, 600)',
                marginBottom: 'var(--spacing-2, 8px)',
                textTransform: 'capitalize',
                color: 'var(--color-on-surface, #2f2f39)',
              }}
            >
              Filter Chips: {style} Style (40 Variants)
            </h3>
            <p style={{ fontSize: 'var(--font-size-body-sm, 12px)', color: 'var(--color-on-surface-light, #9090a2)', marginBottom: 'var(--spacing-6, 24px)' }}>
              Showing 5 Configurations across 4 States (Enabled, Hovered, Dragged, Disabled) for Unselected &amp; Selected.
            </p>

            {/* Selection Groups */}
            {[false, true].map((selected) => (
              <div key={String(selected)} style={{ marginBottom: '32px' }}>
                <div
                  style={{
                    display: 'inline-block',
                    padding: 'var(--spacing-1, 4px) var(--spacing-3, 10px)',
                    borderRadius: 'var(--radius-sm, 8px)',
                    backgroundColor: selected ? 'var(--color-chip-selected-bg, #e9eafc)' : 'var(--color-chip-bg-pressed, #f1f1f3)',
                    color: selected ? 'var(--color-primary-on-surface, #1a28c1)' : 'var(--color-chip-text, #454554)',
                    fontWeight: 'var(--font-weight-semibold, 600)',
                    fontSize: 'var(--font-size-label-md, 12px)',
                    marginBottom: 'var(--spacing-4, 16px)',
                  }}
                >
                  {selected ? '● Selected = True (20 variants)' : '○ Selected = False (20 variants)'}
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      fontSize: '12px',
                    }}
                  >
                    <thead>
                      <tr style={{ borderBottom: '2px solid #e3e3e8', textAlign: 'left' }}>
                        <th style={{ padding: '8px 12px', width: '100px', color: '#9090a2' }}>State</th>
                        {configs.map((c) => (
                          <th key={c.name} style={{ padding: '8px 12px', color: '#454554' }}>
                            {c.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {states.map((state) => (
                        <tr
                          key={state}
                          style={{
                            borderBottom: '1px solid #f1f1f3',
                          }}
                        >
                          <td
                            style={{
                              padding: '12px',
                              fontWeight: 500,
                              color: '#9090a2',
                              textTransform: 'capitalize',
                            }}
                          >
                            {state}
                          </td>
                          {configs.map((config) => (
                            <td key={config.name} style={{ padding: '12px' }}>
                              <Chip
                                type="filter"
                                styleType={style}
                                configuration={config.configuration}
                                iconOnly={config.iconOnly}
                                label={config.label}
                                selected={selected}
                                state={state}
                                disabled={state === 'disabled'}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

/**
 * 3. Input Chips Showcase
 * Interactive tagging component with dismiss action and document attachments
 */
export const InputChipsShowcase = {
  render: () => {
    const [tags, setTags] = useState([
      { id: '1', label: 'Design System', branded: false },
      { id: '2', label: 'Annual_Report_2026.docx', branded: true },
      { id: '3', label: 'Audit_Findings.docx', branded: true },
      { id: '4', label: 'Client Feedback', branded: false },
    ]);
    const [inputVal, setInputVal] = useState('');

    const handleAdd = (e) => {
      e.preventDefault();
      if (!inputVal.trim()) return;
      setTags([...tags, { id: String(Date.now()), label: inputVal.trim(), branded: false }]);
      setInputVal('');
    };

    const handleRemove = (id) => {
      setTags(tags.filter((t) => t.id !== id));
    };

    return (
      <div style={{ padding: '24px', maxWidth: '720px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#2f2f39', marginBottom: '8px' }}>
          Input Chips
        </h3>
        <p style={{ fontSize: '13px', color: '#9090a2', marginBottom: '20px' }}>
          Interactive tagging component. Supports normal tags and branded file attachments with dismissible 'X'.
        </p>

        {/* Live Tag Input Box */}
        <div
          style={{
            border: '1px solid #d5d5dc',
            borderRadius: '12px',
            padding: '12px',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            alignItems: 'center',
            minHeight: '56px',
            marginBottom: '16px',
          }}
        >
          {tags.map((tag) => (
            <Chip
              key={tag.id}
              type="input"
              styleType="outlined"
              label={tag.label}
              isBranded={tag.branded}
              trailingIcon={true}
              onDelete={() => handleRemove(tag.id)}
            />
          ))}

          <form onSubmit={handleAdd} style={{ flexGrow: 1, minWidth: '140px' }}>
            <input
              type="text"
              placeholder="Type tag & press enter..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                fontSize: '13px',
                width: '100%',
                padding: '6px',
                color: '#2f2f39',
              }}
            />
          </form>
        </div>

        <button
          type="button"
          onClick={() =>
            setTags([
              { id: '1', label: 'Design System', branded: false },
              { id: '2', label: 'Annual_Report_2026.docx', branded: true },
              { id: '3', label: 'Audit_Findings.docx', branded: true },
              { id: '4', label: 'Client Feedback', branded: false },
            ])
          }
          style={{
            padding: '6px 12px',
            fontSize: '12px',
            borderRadius: '6px',
            border: '1px solid #d5d5dc',
            background: '#ffffff',
            cursor: 'pointer',
            color: '#454554',
          }}
        >
          Reset Demo Tags
        </button>

        {/* Static Configurations Preview */}
        <div style={{ marginTop: '36px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#454554', marginBottom: '12px' }}>
            Input Chip Configurations:
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <Chip type="input" configuration="Label only" label="Label only" />
            <Chip type="input" configuration="Label and leading icon" label="Leading icon" leadingIcon={true} />
            <Chip type="input" configuration="Label and trailing icon" label="Trailing icon" trailingIcon={true} />
            <Chip type="input" configuration="Label and icons" label="Both icons" leadingIcon={true} trailingIcon={true} />
            <Chip type="input" configuration="Label and leading branded icon" label="Branded leading" isBranded={true} />
            <Chip type="input" configuration="Label and branded icons" label="Branded + dismiss" isBranded={true} trailingIcon={true} />
          </div>
        </div>
      </div>
    );
  },
};

/**
 * 4. Assistive Chips Showcase
 * Quick action trigger chips in Outlined and Elevated styles
 */
export const AssistiveChipsShowcase = {
  render: () => {
    return (
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#2f2f39', marginBottom: '6px' }}>
            Assistive Chips
          </h3>
          <p style={{ fontSize: '13px', color: '#9090a2' }}>
            Quick contextual action triggers. Available in Outlined and Elevated styles.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#454554', marginBottom: '12px' }}>
            Outlined Assistive Chips:
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <Chip type="assistive" styleType="outlined" configuration="Label only" label="Bookmark" />
            <Chip type="assistive" styleType="outlined" label="Quick Action" leadingIcon={true} />
            <Chip type="assistive" styleType="outlined" label="Open Document" isBranded={true} />
            <Chip type="assistive" styleType="outlined" label="Disabled" leadingIcon={true} disabled />
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#454554', marginBottom: '12px' }}>
            Elevated Assistive Chips:
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <Chip type="assistive" styleType="elevated" configuration="Label only" label="Bookmark" />
            <Chip type="assistive" styleType="elevated" label="Quick Action" leadingIcon={true} />
            <Chip type="assistive" styleType="elevated" label="Open Document" isBranded={true} />
            <Chip type="assistive" styleType="elevated" label="Disabled" leadingIcon={true} disabled />
          </div>
        </div>
      </div>
    );
  },
};

/**
 * 5. Suggestion Chips Showcase
 * Recommendation pills for AI prompts and search suggestions
 */
export const SuggestionChipsShowcase = {
  render: () => {
    const [selectedPrompt, setSelectedPrompt] = useState('Quarterly Audit');
    const prompts = ['Quarterly Audit', 'Tax Compliance 2026', 'Advisory Pipeline', 'Risk Assessment'];

    return (
      <div style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#2f2f39', marginBottom: '6px' }}>
          Suggestion Chips
        </h3>
        <p style={{ fontSize: '13px', color: '#9090a2', marginBottom: '20px' }}>
          Single-select recommendation pills for AI prompts and search suggestions.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
          {prompts.map((p) => (
            <Chip
              key={p}
              type="suggestion"
              styleType="outlined"
              label={p}
              selected={selectedPrompt === p}
              leadingIcon={selectedPrompt === p}
              onClick={() => setSelectedPrompt(p)}
            />
          ))}
        </div>

        <div style={{ fontSize: '13px', color: '#454554' }}>
          Selected Prompt: <strong>{selectedPrompt}</strong>
        </div>
      </div>
    );
  },
};

/**
 * 6. Custom Icons & Custom Styling
 */
export const CustomIconsAndBadges = {
  render: () => (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#2f2f39' }}>
        Custom Icons &amp; SVGs
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3, 12px)' }}>
        <Chip
          label="Favorite Filter"
          leadingIcon={<ChipStarSvg fill="var(--color-blue-300, #2f3de3)" />}
          trailingIcon={true}
        />
        <Chip
          styleType="elevated"
          label="Starred Item"
          leadingIcon={<ChipStarSvg fill="var(--color-red-300, #fd349c)" />}
          selected={true}
        />
        <Chip
          label="Corporate Report"
          isBranded={true}
          trailingIcon={<ChipDismissSvg />}
        />
        <Chip
          iconOnly={true}
          aria-label="Filter action"
          trailingIcon={<ChipStarSvg fill="var(--color-primary-action, #1e49e2)" />}
        />
      </div>
    </div>
  ),
};
