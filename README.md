# BotC Player Tool

A mobile-first companion app for **Blood on the Clocktower** — track players, arrange the town square, and mark eliminations during your game.

> **Fan project disclaimer:** This is an unofficial fan-made tool and is not affiliated with, endorsed by, or connected to The Pandemonium Institute or the official Blood on the Clocktower game in any way. All character names, artwork, and game concepts belong to their respective owners.
>
> Check out the official game at **[bloodontheclocktower.com](https://bloodontheclocktower.com/)** 🩸

---

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser, or on your phone via your local IP.

## Build for production

```bash
npm run build
```

Output goes to `dist/` — copy anywhere or serve as a static site.

## Project structure

```
src/
├── styles/
│   ├── variables.css        # CSS custom properties (colors, fonts)
│   └── global.css           # Resets + app layout
├── types/
│   ├── player.types.ts      # Player, PlayerStatus, PlayerAlignment
│   ├── game.types.ts        # GameState, PlayerPosition, GAME_VERSION
│   └── prop-def.types.ts    # PropDef helper type
├── stores/
│   └── game.store.ts        # Pinia store + localStorage persistence
├── composables/
│   └── use-resize-observer.ts
├── i18n/
│   ├── game.json            # Board / toolbar strings
│   ├── player.json          # Player form strings
│   ├── settings.json        # Settings panel strings
│   └── setup.json           # Setup modal strings
├── components/
│   ├── icons/               # SVG icon Vue components
│   ├── game-board/
│   │   ├── composables/
│   │   │   ├── use-board-layout.ts   # Token positions + sizing
│   │   │   └── use-token-drag.ts     # Pointer drag + angle reorder
│   │   ├── styles/game-board.css
│   │   └── GameBoard.vue
│   ├── player-token/
│   │   ├── types/player-token.types.ts
│   │   ├── styles/player-token.css
│   │   └── PlayerToken.vue
│   ├── player-card/
│   │   └── PlayerCard.vue   # Status editor bottom sheet
│   ├── setup-modal/
│   │   └── SetupModal.vue   # New game / edit players
│   └── settings-panel/
│       └── SettingsPanel.vue
└── App.vue

public/
└── icons/
    └── characters/          # Character icons from the BotC wiki (~180 PNGs)
```

## Features

- Start a new game with any number of players (≥ 5)
- Players arranged freely around the town square — drag to reorder
- **Arrange mode**: drag tokens to rearrange; order is preserved by angle
- **Player card**: tap any token to open a status editor
  - Mark players as **Alive**, **Killed** (night), or **Executed** (day vote)
  - Visual status indicators on the token (grayscale + colored status bar)
- **Settings panel**: rename, add, delete players; reset game
- State persists via `localStorage`
- Mobile-first, portrait and landscape supported
- BotC-inspired dark crimson / gold / parchment color theme

## Planned features

- Character role / bluff assignment per player
- Nomination & vote tracking
