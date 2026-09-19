# MyTop — ratings for courses, services, books and products

A ratings-and-reviews storefront built with Next.js (Pages Router). Pages are
generated statically (SSG + ISR, `revalidate: 60`) from an external API.

## Stack

- Next.js 16 (canary, Turbopack), React 19, TypeScript 7 (native `tsc`)
- framer-motion, react-hook-form, axios, date-fns, CSS Modules
- ESLint 10 (flat config), Stylelint 17, Husky

## Getting started

```bash
npm ci --ignore-scripts
npm run dev        # http://localhost:3000
npm run build && npm start
```

`NEXT_PUBLIC_DOMAIN` (see `.env.production`) points to the API host.
Expected endpoints:

| Method | Path | Purpose |
|---|---|---|
| POST | `/api/top-page/find` | second-level menu for a `firstCategory` |
| GET | `/api/top-page/byAlias/:alias` | category page |
| POST | `/api/product/find` | products by `category` and `limit` |
| POST | `/api/review/create-demo` | submit a review |

If the API is unreachable, pages are built with empty data.

## Scripts

| Command | What it does |
|---|---|
| `npm run lint` | ESLint |
| `npm run stylelint` | Stylelint with autofix (also runs in pre-commit) |
| `npx tsc --noEmit` | type check (TypeScript 7) |
| `npm run debug` | dev server with the Node inspector |

## TypeScript 7 and typescript-eslint

The `typescript` package is aliased to `@typescript/typescript6` because
typescript-eslint only supports the TS 6 API so far. The native compiler is
installed as `@typescript/native` and provides the `tsc` command; Next uses it
for type checking during the build. Because of this, dependencies are installed
with `--legacy-peer-deps`.

## Layout

- `pages/` — routes: `/`, `/[type]`, `/[type]/[alias]`, `/search`, `/agreement`, `/privacy`
- `page-components/` — large page-level blocks
- `components/` — UI components (each: `.tsx`, `.props.ts`, `.module.css`)
- `layout/` — header, sidebar, menu, footer, `withLayout` HOC
- `interfaces/`, `helpers/`, `hooks/`, `context/`

## Docker

```bash
docker compose up --build
```

CI (`.github/workflows/main.yml`) runs lint, stylelint, tsc and build, and on
push to `main` publishes the image to GitHub Container Registry.
