import { useState } from 'react';
import { Button } from './components/Button/Button';
import { IconButton } from './components/IconButton/IconButton';

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'left', padding: 'var(--spacing-8) 0' }}>
      <header style={{ marginBottom: 'var(--spacing-8)' }}>
        <h1 style={{ fontSize: 'var(--font-size-headline-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary-on-surface)', marginBottom: 'var(--spacing-2)' }}>
          KPMG WorkBench Design System
        </h1>
        <p style={{ fontSize: 'var(--font-size-body-lg)', color: 'var(--color-on-surface-light)' }}>
          Button & IconButton Component Specifications from Figma Design System (2026).
        </p>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        {/* Common Button Variants */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)' }}>
          <h2 style={{ fontSize: 'var(--font-size-headline-sm)', marginBottom: 'var(--spacing-4)' }}>Common Action Buttons</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)', alignItems: 'center' }}>
            <Button variant="primary" onClick={() => setCount((c) => c + 1)}>
              Primary: {count}
            </Button>
            <Button variant="tonal">Tonal (#E9EAFC Fill)</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="text">Text</Button>
            <Button variant="elevated">Elevated</Button>
            <Button variant="outline" disabled>Disabled Outline (Gray Border)</Button>
          </div>
        </section>

        {/* SVG Icon Props */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)' }}>
          <h2 style={{ fontSize: 'var(--font-size-headline-sm)', marginBottom: 'var(--spacing-4)' }}>SVG Icon Props</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)', alignItems: 'center' }}>
            <Button iconLeft={<StarIcon />}>Favorite</Button>
            <Button variant="tonal" iconRight={<HeartIcon />}>Like</Button>
            <Button variant="outline" iconLeft={<SettingsIcon />}>Settings</Button>
          </div>
        </section>

        {/* Standalone Icon Buttons */}
        <section style={{ backgroundColor: 'var(--color-surface-light)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-outline)' }}>
          <h2 style={{ fontSize: 'var(--font-size-headline-sm)', marginBottom: 'var(--spacing-4)' }}>Standalone Icon Buttons</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)', alignItems: 'center' }}>
            <IconButton variant="filled" icon={<SettingsIcon />} aria-label="Filled Settings" />
            <IconButton variant="outline" icon={<SettingsIcon />} aria-label="Outline Settings" />
            <IconButton variant="standard" icon={<SettingsIcon />} aria-label="Standard Settings" />
            <IconButton variant="neutral" icon={<SettingsIcon />} aria-label="Neutral Settings" />
            <IconButton variant="outline" disabled icon={<SettingsIcon />} aria-label="Disabled Settings" />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
