# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm start` (runs `ng serve`, default port 4200)
- **Build:** `npm run build` (production) or `ng build --configuration development`
- **Watch mode:** `npm run watch`
- **Run tests:** `npm test` (Karma + Jasmine)
- **Deploy to GitHub Pages:** `ng deploy`

## Architecture

Angular 20 personal website app using standalone components (no NgModules), zoneless change detection, and hash-based routing.

### Key configuration choices
- **Zoneless:** Uses `provideZonelessChangeDetection()` in `app.config.ts` — no Zone.js
- **Router:** Hash location strategy (`withHashLocation()`)
- **Styling:** SCSS with Bootstrap 5 loaded via CDN in `index.html`; Font Awesome also via CDN
- **Formatting:** Prettier configured in `package.json` with Angular HTML parser override
- **Deployment:** `angular-cli-ghpages` available for GitHub Pages deployment

### Component structure
All components are standalone with separate `.ts`, `.html`, `.scss` files (no inline templates). Component prefix is `app`. Components use class names directly (e.g., `Header`, `Footer`, `ComingSoon`) rather than suffixed names.

Root `App` component composes `Header`, `ComingSoon`, and `Footer`. Routing exists (`app.routes.ts`) but has no routes defined yet.
