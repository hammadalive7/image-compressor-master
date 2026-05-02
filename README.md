<div align="center">

# Image Compressor

**Free, open-source image compression — entirely in your browser.**

No uploads. No servers. No data ever leaves your device.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## Features

- **100% Client-Side** — All compression runs locally via the Web APIs. Nothing is uploaded, stored, or tracked.
- **Multi-Format** — Supports JPEG, PNG, and WebP input. PNG is automatically converted to WebP for maximum size reduction.
- **Batch Processing** — Drop multiple images at once and compress them in a single pass.
- **Adjustable Quality** — Fine-tune compression with a 0–100 quality slider; the original is preserved if compression would make the file larger.
- **ZIP Download** — Download all results as a single archive in one click.
- **Drag & Drop** — Upload by dragging files directly onto the drop zone.
- **Responsive** — Optimized for mobile, tablet, and desktop with a sticky sidebar layout on large screens.
- **Dark / Light Theme** — Follows your system preference with a manual override.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript 5.8 |
| Bundler | Vite 6 + SWC |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Compression | CompressorJS + JSZip |
| Notifications | Sonner |
| Photo viewer | react-photo-view |

---

## Getting Started

**Prerequisites:** Node.js 20+

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

---

## Project Structure

```
src/
├── components/         # UI components
│   └── ui/             # Primitive shadcn/ui components
├── hooks/              # Custom React hooks (state logic)
│   └── index.ts        # Barrel export
├── lib/                # Pure business logic — no React dependencies
│   ├── types.ts        # Shared TypeScript interfaces
│   ├── image-compression.ts
│   ├── file-validation.ts
│   ├── download.ts
│   ├── utils.ts
│   └── index.ts        # Barrel export
├── App.tsx
└── main.tsx
public/                 # Static assets, PWA manifest, sitemap
```

**Architecture:** each layer has a single responsibility — components are presentational only, state lives in hooks, and `lib/` contains pure functions with zero React dependencies (making them straightforward to test in isolation).

---

## License

[MIT](LICENSE) © [hammadalive7](https://github.com/hammadalive7)
