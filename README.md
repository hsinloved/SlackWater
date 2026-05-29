# Slack Water — Calm Breathwork

A minimal, mobile-first **PWA** for safe, dry-land breath-awareness practice
aimed at beginner freedivers. The focus is relaxation, gentle breathing rhythm,
comfortable breath-hold timing, and post-session reflection — **not** maximal
performance.

> Dry-land practice only. Never practise breath-holding alone in water. Do not
> hyperventilate. Stop if dizzy, uncomfortable, or unwell. This app is not a
> substitute for a certified freediving instructor.

## Features

- **Three practice modes**
  - **Relaxed Breathing** — guided inhale/exhale rhythm, optional gentle holds, no breath-hold.
  - **Gentle Static Hold** — preparation breathing → comfortable inhale → breath-hold → recovery, over configurable rounds, with an always-available **"I need to breathe"** early-exit.
  - **RV Mobility / Empty-Lung Stretch** — short, gentle empty-lung mobility (2–10 s), never a max hold.
- Calm, large-typography active screen with a breathing-circle animation, progress ring, and big countdown.
- Soft Web Audio API phase cues + optional vibration (both fully optional; the app works with them off).
- Mandatory **safety acknowledgement** on first launch (stored in `localStorage`).
- Post-session **reflection** (feeling, perceived effort, breath-hold time, notes) saved to a local **history**.
- Installable, offline-capable PWA (manifest + service worker via `vite-plugin-pwa`).

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS · React Router · `vite-plugin-pwa` ·
Vitest. No backend — settings and history live in `localStorage`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # type-check + production build (generates the service worker)
npm run preview  # serve the production build locally
npm test         # run the Vitest unit suite
npm run lint     # ESLint
```

## Project structure

```
src/
  components/        # Button, TimerDisplay, BreathingCircle, SafetyModal, …
  features/
    session/         # sessionTypes, sessionPresets, sessionEngine, useSessionTimer
    history/         # historyStorage, HistoryList
  pages/             # Home, Setup, ActiveSession, Complete, History
  utils/             # audioCues, vibration, storage, format
```

The core domain is the **session engine**: `generateSessionPlan(config)` expands
a mode config into an ordered list of timed `SessionPhaseStep`s, and
`useSessionTimer` consumes that plan as a drift-corrected state machine
(`idle → running ⇄ paused → complete/stopped`). Both are covered by unit tests
in `src/features/session/*.test.ts`.

## Verifying offline / installability

1. `npm run build && npm run preview`
2. Open the preview URL, then in DevTools → Application, confirm the manifest and
   service worker register. Toggle **Offline** and reload — the app still loads.

## Limitations & next steps

- Icons are simple generated placeholders; replace with final artwork in `public/`.
- Timing uses `setInterval` + wall-clock correction; it is accurate in the
  foreground but mobile browsers may throttle fully-suspended tabs.
- History is device-local (no sync). Natural follow-ups: CSV export, simple
  trend charts (feeling over time, urge-to-breathe timing), and richer cue audio.
