# Upgrade plan

## Current state

Score: 7/10 (was 4/10) — browsing by theme and saving prompts now actually work (both were broken), with tests and CI.

## Backlog

- P1: Add more concepts (currently 5) with a source/further-reading line each.
- P1: Let the visitor write a private note under a saved prompt (local only).
- P2: Crisis-support pointer in the footer (the product explicitly excludes crisis support; a link to local services is the honest complement).
- P2: Playwright smoke test for theme → concept → save.

## Done in this pass

- CI (`.github/workflows/ci.yml`): `npm ci`, lint, typecheck, vitest, `next build` on every push and PR.
- Concept data and navigation moved to `lib/concepts.ts` (tested).
- Fixed: choosing a theme never changed the reading sheet and there was no way to open a specific concept; the index now lists the theme's concepts and selecting a theme opens its first one. "Turn the page" stays within the theme.
- Fixed: saved prompts were lost on reload despite the product promise; they now persist via `lib/use-stored-state.ts` and are listed in a new "Your margin" section with remove buttons.
- Buttons have explicit `type`, `aria-pressed`/`aria-current` state.
