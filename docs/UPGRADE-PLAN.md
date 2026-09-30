# Upgrade plan

## Current state

Score: 7/10 (was 4/10) — browsing by theme and saving prompts now actually work (both were broken), with tests and CI.

## Backlog

- P1: Add more concepts (currently 5) with a source/further-reading line each.
- P2: Crisis-support pointer in the footer (the product explicitly excludes crisis support; a link to local services is the honest complement).
- P2: Playwright smoke test for theme → concept → save.

## Done in this pass

- CI (`.github/workflows/ci.yml`): `npm ci`, lint, typecheck, vitest, `next build` on every push and PR.
- Concept data and navigation moved to `lib/concepts.ts` (tested).
- Fixed: choosing a theme never changed the reading sheet and there was no way to open a specific concept; the index now lists the theme's concepts and selecting a theme opens its first one. "Turn the page" stays within the theme.
- Fixed: saved prompts were lost on reload despite the product promise; they now persist via `lib/use-stored-state.ts` and are listed in a new "Your margin" section with remove buttons.
- Buttons have explicit `type`, `aria-pressed`/`aria-current` state.

## Done in this pass (pass 2)

- Added config-driven canonical host (the app had no sitemap or robots at all): `lib/site.ts` resolves `NEXT_PUBLIC_SITE_URL` (validated; clear error on a non-http(s) value, default is the Vercel project URL) and feeds `metadataBase` plus generated `app/sitemap.ts` / `app/robots.ts` (`/api/` disallowed), matching the portfolio-wide pattern. Tested in `lib/site.test.ts`.
- Private notes under each saved prompt (labelled textarea, capped at 1000 chars, blank clears it), stored separately in this browser and validated on load (`setNote` / `parseNotes` in `lib/concepts.ts`, tested).

## Done in this pass (pass 3)
- Edge-case pass on `lib/concepts.ts` (regression tests in `lib/concepts.test.ts`):
  - `setNote` / `parseNotes` cut notes at `MAX_NOTE` with `slice`, leaving a
    lone surrogate when an emoji straddled the limit. New `clipNote` drops the
    whole emoji instead.
  - Notes made only of zero-width characters / BOM were stored as real notes;
    they now count as blank and clear the note.
