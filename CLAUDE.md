# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gradient Generator (그라디언트 생성기) is a React web app for creating CSS gradients with real-time preview. All UI text is in Korean. It supports 5 gradient types: linear, radial, conic, repeating-linear, and repeating-radial.

## Build & Run Commands

```bash
npm install              # Install dependencies
npm run dev              # Dev server at http://localhost:5173
npm run build            # Production build (output: dist/)
npm run lint             # ESLint (flat config, JS/JSX only)
npm run preview          # Preview production build
```

## Architecture

Single-page React app with no routing, no global state library — state lives in custom hooks, passed down as props.

- **Entry**: `App.jsx` renders `GradientGenerator` as the sole top-level component.
- **`GradientGenerator`** (`src/components/`): Orchestrator that wires together all child components. Consumes both custom hooks and passes state/callbacks as props.
- **`useGradient` hook** (`src/hooks/useGradient.js`): Central state manager holding gradient type, angle, radial shape, conic center, color stops, and history (max 10 items). Exposes all mutation functions. History is auto-saved on random generation and preset application via `setTimeout(…, 100)` to capture post-state-update values.
- **`useClipboard` hook** (`src/hooks/useClipboard.js`): Clipboard API wrapper with auto-clearing status message.
- **`gradientUtils.js`** (`src/utils/`): Pure functions — `generateGradientCSS()` builds the CSS string from gradient params; also exports color conversion helpers and type/shape metadata constants.
- **`presets.js`** (`src/data/`): Static array of 12 preset gradient configs (each has `id`, `name`, `colors`, `type`, `angle`).

## Key Conventions

- **Styling**: Tailwind CSS 3 utility classes; dark theme (`bg-gray-900` base). No custom CSS besides `index.css`.
- **Font**: Chiron Sung HK (loaded from Google Fonts), with Malgun Gothic fallback.
- **ESLint rule**: `no-unused-vars` ignores variables starting with uppercase or underscore (`varsIgnorePattern: '^[A-Z_]'`).
- **Color stop model**: `{ color: string, position: number }` where position is 0-100. Minimum 2 stops enforced.
- **No tests configured** — there is no test framework or test files in the project.
