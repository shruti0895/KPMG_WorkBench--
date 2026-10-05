import React, { useState } from 'react';
import { List } from './List';
import { ListItem } from './ListItem';

export default {
  title: 'Components/List',
  component: List,
  subcomponents: { ListItem },
  parameters: {
    docs: {
      description: {
        component: `
### KPMG WorkBench Design System - List Component

Lists organize related items in a vertical format. They provide a consistent layout for text, images, controls, and actions.

#### Key Architecture & 12 Variants Matrix:
- **3 Container Styles**:
  - \`outlined\`: Clean container with subtle 1px border (\`--color-list-border-outlined\`)
  - \`elevated\`: Container with soft elevation drop shadow (\`--color-list-elevated-shadow\`)
  - \`filled\`: Subtle tinted container fill (\`--color-list-bg-filled\`)
- **4 Canonical Leading Element Types**:
  - \`Avatar\`: Circular 40px gradient avatar with user initials
  - \`Image\`: Rounded 48px square image / document thumbnail
  - \`Checkbox\`: Selection control with checkmark state
  - \`Radio\`: Single-choice radio indicator
- **Combinations**:
  **4 Leading Types × 3 Container Styles = 12 Production Variants**

#### 3 Density Sizes:
- **Small** (1-line item, 56px height): Title only
- **Medium** (2-line item, 68px height): Title + Supporting description
- **Large** (3-line item, 88px height): Title + Extended description + Secondary metadata
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    styleType: {
      control: 'select',
      options: ['outlined', 'elevated', 'filled'],
      description: 'Visual container treatment',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Density size of list items',
    },
    divided: {
      control: 'boolean',
      description: 'Whether to show dividers between items',
    },
  },
};

const sampleItems = [
  { id: '1', title: 'List item', supportingText: 'Supporting line text lorem ipsum dolor sit amet.' },
  { id: '2', title: 'List item', supportingText: 'Supporting line text lorem ipsum dolor sit amet.' },
  { id: '3', title: 'List item', supportingText: 'Supporting line text lorem ipsum dolor sit amet.' },
  { id: '4', title: 'List item', supportingText: 'Supporting line text lorem ipsum dolor sit amet.' },
  { id: '5', title: 'List item', supportingText: 'Supporting line text lorem ipsum dolor sit amet.' },
];

/** Interactive Default Story */
export const Default = {
  args: {
    styleType: 'outlined',
    size: 'medium',
    divided: false,
  },
  render: (args) => (
    <div style={{ maxWidth: '400px' }}>
      <List {...args}>
        {sampleItems.map((item) => (
          <ListItem
            key={item.id}
            title={item.title}
            supportingText={item.supportingText}
            leading="avatar"
            leadingProps={{ initials: 'AZ' }}
            trailing="checkbox"
            trailingProps={{ checked: true }}
            onClick={() => console.log('Clicked item', item.id)}
          />
        ))}
      </List>
    </div>
  ),
};

/** Complete 12 Variants Matrix (4 Leading Types × 3 Container Styles) */
export const Complete12VariantsMatrix = () => {
  const styles = [
    { key: 'outlined', label: 'Outlined Style (Bordered)' },
    { key: 'elevated', label: 'Elevated Style (Shadowed)' },
    { key: 'filled', label: 'Filled Style (Tinted Surface)' },
  ];

  const leadingTypes = [
    {
      key: 'avatar',
      label: '1. Avatar Leading (Trailing Checkbox)',
      getProps: () => ({
        leading: 'avatar',
        leadingProps: { initials: 'AZ' },
        trailing: 'checkbox',
        trailingProps: { checked: true },
      }),
    },
    {
      key: 'image',
      label: '2. Image / Thumbnail Leading',
      getProps: () => ({
        leading: 'image',
        trailing: 'none',
      }),
    },
    {
      key: 'checkbox',
      label: '3. Checkbox Leading (Trailing Chevron Arrow)',
      getProps: () => ({
        leading: 'checkbox',
        leadingProps: { checked: true },
        trailing: 'arrow',
      }),
    },
    {
      key: 'radio',
      label: '4. Radio Button Leading (Trailing Chevron Arrow)',
      getProps: () => ({
        leading: 'radio',
        leadingProps: { checked: true },
        trailing: 'arrow',
      }),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '1200px' }}>
      {leadingTypes.map((type) => (
        <div key={type.key}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
            {type.label}
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {styles.map((s) => (
              <div key={`${type.key}-${s.key}`}>
                <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-primary-on-surface, #1a28c1)', marginBottom: '8px' }}>
                  {s.label}
                </div>
                <List styleType={s.key} size="medium">
                  {[1, 2, 3, 4].map((i) => (
                    <ListItem
                      key={i}
                      title="List item"
                      supportingText="Supporting line text lorem ipsum..."
                      {...type.getProps()}
                    />
                  ))}
                </List>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/** 3 Density Sizes (Small, Medium, Large) */
export const DensitySizes = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '24px',
      maxWidth: '1100px',
    }}
  >
    {/* Small (1-Line) */}
    <div>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '15px' }}>Small (1-Line: 56px height)</h4>
      <List styleType="outlined" size="small">
        <ListItem title="First item headline" leading="avatar" leadingProps={{ initials: 'JD' }} trailing="arrow" />
        <ListItem title="Second item headline" leading="avatar" leadingProps={{ initials: 'MK' }} trailing="arrow" />
        <ListItem title="Third item headline" leading="avatar" leadingProps={{ initials: 'SL' }} trailing="arrow" />
      </List>
    </div>

    {/* Medium (2-Line) */}
    <div>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '15px' }}>Medium (2-Line: 68px height)</h4>
      <List styleType="outlined" size="medium">
        <ListItem
          title="Account Security"
          supportingText="Two-factor authentication enabled."
          leading="avatar"
          leadingProps={{ initials: 'AS' }}
          trailing="checkbox"
        />
        <ListItem
          title="Billing Preferences"
          supportingText="Monthly invoice delivered via email."
          leading="avatar"
          leadingProps={{ initials: 'BP' }}
          trailing="checkbox"
        />
        <ListItem
          title="Notification Settings"
          supportingText="Email, push, and desktop alerts."
          leading="avatar"
          leadingProps={{ initials: 'NS' }}
          trailing="checkbox"
        />
      </List>
    </div>

    {/* Large (3-Line) */}
    <div>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '15px' }}>Large (3-Line: 88px height)</h4>
      <List styleType="outlined" size="large">
        <ListItem
          title="Audit Workpaper FY2026"
          supportingText="Supporting line text lorem ipsum dolor sit amet, consectetur adipiscing elit."
          secondaryText="Updated 2 hours ago by System Admin"
          leading="image"
          trailing="arrow"
        />
        <ListItem
          title="Risk Assessment Summary"
          supportingText="Supporting line text lorem ipsum dolor sit amet, consectetur adipiscing elit."
          secondaryText="Pending partner review"
          leading="image"
          trailing="arrow"
        />
      </List>
    </div>
  </div>
);

/** Interactive Single & Multi-Selection */
export const InteractiveSelection = () => {
  const [selectedRadio, setSelectedRadio] = useState('opt-1');
  const [selectedChecks, setSelectedChecks] = useState(['chk-1', 'chk-3']);

  const toggleCheck = (id) => {
    setSelectedChecks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '32px',
        maxWidth: '800px',
      }}
    >
      {/* Radio Selection */}
      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '15px' }}>Single Choice (Radio Control)</h4>
        <List styleType="outlined" size="medium">
          {[
            { id: 'opt-1', title: 'Option 1', desc: 'Standard configuration preset' },
            { id: 'opt-2', title: 'Option 2', desc: 'High-performance computing cluster' },
            { id: 'opt-3', title: 'Option 3', desc: 'Custom enterprise deployment' },
          ].map((item) => (
            <ListItem
              key={item.id}
              title={item.title}
              supportingText={item.desc}
              leading="radio"
              leadingProps={{ checked: selectedRadio === item.id }}
              trailing="arrow"
              selected={selectedRadio === item.id}
              onClick={() => setSelectedRadio(item.id)}
            />
          ))}
        </List>
      </div>

      {/* Checkbox Multi-Selection */}
      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '15px' }}>Multi-Choice (Checkbox Control)</h4>
        <List styleType="outlined" size="medium">
          {[
            { id: 'chk-1', title: 'Analytics Module', desc: 'Include telemetry and insights' },
            { id: 'chk-2', title: 'Export Capabilities', desc: 'Enable PDF and Excel downloads' },
            { id: 'chk-3', title: 'Audit Trail', desc: 'Record historical event log' },
          ].map((item) => {
            const isChecked = selectedChecks.includes(item.id);
            return (
              <ListItem
                key={item.id}
                title={item.title}
                supportingText={item.desc}
                leading="checkbox"
                leadingProps={{ checked: isChecked }}
                trailing="arrow"
                selected={isChecked}
                onClick={() => toggleCheck(item.id)}
              />
            );
          })}
        </List>
      </div>
    </div>
  );
};
