## Overview

Free and Open Source Image Compressor. Optimizes images `locally`, delivering unmatched efficiency `without storing a single file`. Experience lightning-fast compression, all in one place.

## Project Structure

```
├── public/                     # Static assets and PWA manifest
├── src/
│   ├── components/             # React components
│   │   ├── ui/                # Reusable UI components (shadcn/ui)
│   │   ├── action-buttons.tsx
│   │   ├── compressed-images-grid.tsx
│   │   ├── drop-zone.tsx
│   │   ├── image-preview-card.tsx
│   │   ├── image-quality-slider.tsx
│   │   └── [other components]
│   ├── hooks/
│   │   ├── useDragAndDrop.ts
│   │   └── useImageCompression.ts
│   ├── lib/
│   │   ├── download.ts
│   │   ├── file-validation.ts
│   │   ├── image-compression.ts
│   │   └── utils.ts
│   ├── types/
│   │   └── image-compressor.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js `20+` and `npm`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
npm run format    # Format code with Prettier
```

## Features

- **Multi-Format Support**: JPEG, PNG, WebP
- **Quality Control**: Adjustable compression levels
- **Batch Processing**: Compress multiple images at once
- **ZIP Downloads**: Download all compressed images in one archive
- **Drag & Drop**: Intuitive file upload
- **Responsive Design**: Works on all screen sizes
- **Dark/Light Theme**: Automatic theme switching
- **Privacy Focused**: All processing happens locally in your browser — no uploads, no APIs

## License

MIT License — see [LICENSE](LICENSE) for details.
