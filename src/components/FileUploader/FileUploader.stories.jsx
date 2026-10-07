import React, { useState } from 'react';
import {
  FileUploader,
  FileUploaderArrowIconSvg,
  FileUploaderIllustrationIconSvg,
} from './FileUploader';

export default {
  title: 'Components/FileUploader',
  component: FileUploader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'FileUploader component formatted to match Figma Node 1003:54273. Complete 9 variant matrix (3 Sizes: Small, Medium, Large × 3 Surface States: Outline, Elevated, Filled) with drag and drop file handling, custom SVG props, and token-driven design.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Uploader height scale (Small 128px, Medium 128px, Large 202px)',
    },
    state: {
      control: 'select',
      options: ['outline', 'elevated', 'filled'],
      description: 'Surface visual state (Outline border, Elevated shadow, Filled tonal background)',
    },
    label: { control: 'text' },
    browseText: { control: 'text' },
    subtext: { control: 'text' },
    accept: { control: 'text' },
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
  },
};

// 1. Basic Medium Outline Uploader
export const DefaultMediumOutline = {
  args: {
    size: 'medium',
    state: 'outline',
    label: 'Drag and drop files or ',
    browseText: 'browse on computer',
    subtext: 'Supports PNG, JPG, PDF up to 10MB',
  },
};

// 2. Large Filled Uploader
export const LargeFilledWithIllustration = {
  args: {
    size: 'large',
    state: 'filled',
    label: 'Drag and drop files or ',
    browseText: 'browse on computer',
    subtext: 'Supports CSV, XLSX up to 25MB',
  },
};

// 3. Elevated State Uploader
export const ElevatedCard = {
  args: {
    size: 'medium',
    state: 'elevated',
    label: 'Drag and drop files or ',
    browseText: 'browse on computer',
  },
};

// 4. Interactive File Selection & Drop Demo
export const InteractiveFileSelection = {
  render: () => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFiles = (files) => {
      setSelectedFiles((prev) => [...prev, ...files]);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '450px' }}>
        <h4 style={{ fontFamily: 'Open Sans', margin: 0 }}>Interactive File Uploader</h4>

        <FileUploader
          size="medium"
          state="outline"
          subtext="Try dragging files onto this dropzone"
          onFileSelect={handleFiles}
        />

        {selectedFiles.length > 0 && (
          <div style={{ backgroundColor: '#FAFAFD', padding: '16px', borderRadius: '8px', border: '1px solid #E3E3E8' }}>
            <h5 style={{ margin: '0 0 8px 0', fontFamily: 'Open Sans', fontSize: '13px' }}>Selected Files ({selectedFiles.length}):</h5>
            <ul style={{ margin: 0, paddingLeft: '20px', fontFamily: 'Open Sans', fontSize: '12px', color: '#3D405B' }}>
              {selectedFiles.map((file, idx) => (
                <li key={`${file.name}-${idx}`}>
                  {file.name} ({Math.round(file.size / 1024)} KB)
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setSelectedFiles([])}
              style={{ marginTop: '12px', padding: '4px 10px', fontSize: '11px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #CCC' }}
            >
              Clear List
            </button>
          </div>
        )}
      </div>
    );
  },
};

// 5. Complete 9 Figma Variants Matrix Story (Figma Node 1003:54273 Specs)
export const All9FigmaVariantsMatrix = {
  render: () => {
    const SIZES = [
      { id: 'small', name: 'Small (128px Height)' },
      { id: 'medium', name: 'Medium (128px Height)' },
      { id: 'large', name: 'Large (202px Height with Card Illustration)' },
    ];

    const STATES = [
      { id: 'outline', name: 'Outline State' },
      { id: 'elevated', name: 'Elevated State' },
      { id: 'filled', name: 'Filled State' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', padding: '16px', maxWidth: '900px', width: '100%' }}>
        <header>
          <h3 style={{ fontFamily: 'Open Sans', marginBottom: '8px' }}>
            File Uploader Figma Specs: Complete 9 Variants Matrix
          </h3>
          <p style={{ fontFamily: 'Open Sans', color: '#5D5D6A', fontSize: '14px' }}>
            3 Sizes (Small, Medium, Large) × 3 Visual States (Outline, Elevated, Filled)
          </p>
        </header>

        {SIZES.map((sizeObj) => (
          <div key={sizeObj.id} style={{ backgroundColor: '#FAFAFD', padding: '24px', borderRadius: '12px', border: '1px solid #E3E3E8' }}>
            <h4 style={{ fontFamily: 'Open Sans', marginBottom: '20px', color: '#1A28C1' }}>
              Size: {sizeObj.name}
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {STATES.map((stateObj) => (
                <div key={`${sizeObj.id}-${stateObj.id}`} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#3D405B' }}>
                    {stateObj.name}
                  </span>
                  <FileUploader
                    size={sizeObj.id}
                    state={stateObj.id}
                    label="Drag and drop files or "
                    browseText="browse on computer"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
