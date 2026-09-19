# MyTop — ratings for courses, services, books and products

A ratings-and-reviews storefront built with Next.js App Router. Data comes from
an external API through `'use cache'` functions (Cache Components, `cacheLife('minutes')`),
so pages are prerendered and revalidated in the background.

## Stack

- Next.js 16 (canary, Turbopack, Cache Components, React Compiler), React 19, TypeScript 7 (native `tsc`)
- motion, react-hook-form, date-fns, CSS Modules
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

- `app/` — routes: `/`, `/[type]`, `/[type]/[alias]`, `/search`, `/agreement`, `/privacy`,
  plus `not-found.tsx` and `error.tsx`; `(main)` and `[type]` layouts load the menu and wrap the shell
- `page-components/` — large page-level blocks
- `components/` — UI components (each: `.tsx`, `.props.ts`, `.module.css`)
- `layout/` — client shell: header, sidebar, menu, footer
- `helpers/data.ts` — cached server data access; `helpers/api.ts` — endpoint URLs
- `interfaces/`, `hooks/`, `context/`

Unknown `/[type]/[alias]` pages are streamed with Partial Prerendering, so a
missing alias renders the not-found UI with `noindex` but an HTTP 200 shell.

## Docker

```bash
docker compose up --build
```

CI (`.github/workflows/main.yml`) runs lint, stylelint, tsc and build, and on
push to `main` publishes the image to GitHub Container Registry.
