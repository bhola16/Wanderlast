# wanderlast

Travel landing-page app ("Wanderlast"): a single-page Next.js frontend. The homepage in `src/app/page.tsx` composes section components in `src/components/` (e.g. `navbar.tsx`, `banner.tsx`); shadcn primitives live separately in `src/components/ui/`. Image assets already exist under `public/assets/` (incl. `destinations/`, plus `Banner.png` and `Wanderlast.png` logo used by the banner/navbar). No tests, no backend, no CI.

## Commands

- `npm run dev` — dev server (Turbopack) at http://localhost:3000
- `npm run lint` — ESLint 9 flat config (`eslint.config.mjs`)
- `npm run build` — production build
- No typecheck/test scripts: verify changes with `npm run lint` + `npm run build` (build runs TS checks).

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

## Stack quirks

- Next.js 16.4.3 with App Router, all code under `src/app` (not a repo-root `app/`).
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`) — don't add manual `useMemo`/`useCallback`/`memo` optimization; it's unnecessary here.
- Tailwind v4, CSS-first: theming/config lives in `src/app/globals.css`; there is no `tailwind.config` file. Tailwind is wired through the Turbopack rule in `next.config.ts`, so run `npm run dev`/`build` (Turbopack), not webpack.
- shadcn-style components, but style `base-nova` built on **Base UI** (`@base-ui/react`), not Radix — check `src/components/ui/*.tsx` and follow existing primitives' patterns instead of pasting standard shadcn/Radix code.
- Route to UI primitives via path aliases from `components.json`: `@/components`, `@/components/ui`, `@/hooks`, `@/lib`. Add new primitives with `npx shadcn add <name>`.
- Global font (Josefin Sans) is loaded in `src/app/layout.tsx`; shared display fonts live in `src/lib/fonts.ts` (`display` = Cormorant Garamond for section headings, `wordmark` = Archivo 900 for the footer logo) — check there before adding a new Google font. Static assets live in `public/assets/`.
- `lucide-react` 1.x has **no brand icons** (no Twitter/X, LinkedIn, Instagram…) — use inline SVGs for social logos (see `src/components/footer.tsx`).

## Environment

Windows dev machine (repo at `D:\PH\...`). Use `npm` (package-lock.json is the source of truth; don't introduce other package managers).
