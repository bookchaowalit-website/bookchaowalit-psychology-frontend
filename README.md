# Psychology Explorer

Educational concept notes for learning and reflection. Not diagnosis,
treatment, or crisis support.

## Features

- Browse concepts by theme; pick any concept from the index
- Turn the page within the current theme
- Save reflection prompts to "Your margin" (localStorage, validated on load)

## Run

```bash
npm ci
npm run dev
```

## Checks

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

CI runs the same checks on every push (`.github/workflows/ci.yml`).

## Configuration

- `NEXT_PUBLIC_SITE_URL` (optional): canonical origin used for metadata, `/sitemap.xml` and `/robots.txt`. Defaults to `https://bookchaowalit-psychology-frontend.vercel.app`; must be an absolute http(s) URL.
