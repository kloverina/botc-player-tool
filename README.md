# BotC Player Tool

A mobile-first player helper for **Blood on the Clocktower**.

## Setup

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser (or on your phone via your local IP).

## Build for production

```bash
npm run build
```

Output goes to `dist/` — copy anywhere or serve as a static site.

## Project structure

```
src/
├── types/index.ts          # Player & GameState interfaces (extensible)
├── stores/gameStore.ts     # Pinia store + localStorage persistence
├── components/
│   ├── SetupModal.vue      # New game / edit players modal
│   ├── GameBoard.vue       # Circular token layout + drag mode
│   ├── PlayerToken.vue     # Individual player circle token
│   └── SettingsPanel.vue   # Settings bottom sheet (list view)
└── App.vue                 # Root component
```

## Features (v0.1)
- Start a new game with any number of players (≥5)
- Players arranged in a circle like the physical game
- **Rearrange mode**: tap a token → tap another to swap positions
- **Settings panel**: drag-to-reorder list, rename, add, delete players
- State persists via `localStorage`
- Mobile-first, landscape orientation supported
- BotC-inspired dark crimson / gold / parchment color theme

## Extensibility

The `Player` type already has optional fields ready for future features:
- `role` / `roleImage` — character assignment
- `status` — alive / dead / executed
- `alignment` — good / evil
- `notes` — freeform storyteller notes
- `isNominated`, `hasVoted` — for nomination tracking
