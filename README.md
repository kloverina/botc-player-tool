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

## Features

- Start a new game with any number of players (≥ 5)
- Players arranged freely around the town square — drag to reorder
- **Arrange mode**: drag tokens to rearrange; order is preserved by angle
- **Player card**: tap any token to open a status editor
  - Mark players as **Alive**, **Killed** (night), or **Executed** (day vote)
  - Visual status indicators on the token
- **Settings panel**: rename, add, delete players; reset game
- State persists via `localStorage`
- Portrait and landscape supported
