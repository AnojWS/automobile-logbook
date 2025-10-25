# Copilot instructions for Automobile Logbook

This file gives focused, actionable context so an AI coding agent can be productive quickly in this repository.

Quick facts
- Next.js (app router) project using the `app/` directory. Next version in package.json: 15.x. React 19.
- Package manager: pnpm preferred (repo contains `pnpm-lock.yaml`) but `npm` scripts in `package.json` work the same.
- Dev server: `next dev -p 9586` (see `package.json` -> `scripts.dev`).

How to run locally
- Install deps: `pnpm install` (or `npm install`).
- Start dev: `pnpm dev` or `npm run dev`. The dev server binds to port 9586 by default.
- Build: `pnpm build` or `npm run build`. Note: `next.config.mjs` currently sets `eslint.ignoreDuringBuilds` and `typescript.ignoreBuildErrors` to `true`.

Environment & Firebase
- Firebase is configured in `lib/firebase.ts` and reads public env vars: `NEXT_PUBLIC_API_KEY`, `NEXT_PUBLIC_AUTH_DOMAIN`, `NEXT_PUBLIC_PROJECT_ID`, etc.
- The `.env` at repository root holds these `NEXT_PUBLIC_...` values (used client-side). When editing or testing, ensure these env vars are present.

Architecture & important files
- `app/` — Next app routes and server components. Example: `app/logbook/[recordId]/page.tsx` loads the logbook page and renders the client component `LogbookView`.
- `components/` — shared UI and page-specific components. `logbook-view.tsx` is a client component that reads/writes Firestore.
- `components/ui/` — design-system primitives (Button, Card, Input, Toaster, etc.). Prefer using these for UI consistency.
- `lib/` — small platform utilities and types. `lib/firebase.ts` exports `db`. `lib/types.ts` contains `LogbookData`.
- `hooks/` — lightweight hooks like `use-toast` and `use-mobile` used across client components.

Patterns & conventions (concrete, discoverable)
- Client vs Server: files with the string `"use client"` (e.g., `components/logbook-view.tsx`, `components/logbook-form.tsx`, `app/admin/page.tsx`) are client components. Do not convert a client component to a server component unless you move all browser-only code (e.g., Window/Clipboard/DOM APIs, Firebase client SDK) out of it.
- Firestore usage: the app uses the Firebase client SDK directly inside client components. Collection name: `logbooks`. Example read/write pattern used across repo:

  Read a doc:

  const docRef = doc(db, 'logbooks', recordId)
  const docSnap = await getDoc(docRef)

  Write a doc:

  const newData = { ...data, createdAt: new Date().toISOString() }
  await setDoc(docRef, newData)

- Record id generation: `app/admin/page.tsx` generates IDs like `VEH-<timestamp>-<random>` and builds URLs: `${origin}/logbook/${recordId}`. Use those routes when writing tests or fixtures.
- UI: Tailwind classes are used directly in JSX; follow the existing class patterns (container, bg-card, text-foreground, etc.). `globals.css` and `styles/globals.css` hold base styles.

Debugging & developer notes
- Dev origin: `next.config.mjs` sets `experimental.allowedDevOrigins` and the dev server runs on port 9586. If testing on LAN devices, add your IP to allowedDevOrigins.
- Lint/TS: The project intentionally ignores build-time ESLint/TS errors (see `next.config.mjs`). Be cautious: type or lint issues might exist but won't block `next build`.
- No tests or CI are present in the repo: unit tests and CI configs are not discoverable. If adding tests, prefer small, focused tests around `lib` helpers and Firestore interactions (mock Firebase SDK).

When editing code
- Reference `components/ui/*` for UI primitives. Keep TypeScript types in `lib/types.ts` updated when changing the shape of `LogbookData`.
- For Firestore changes, always check `components/logbook-view.tsx` and `app/admin/page.tsx` to keep read/write flows consistent.

Missing / next steps (for humans)
- Add README.md with setup, CI, and deployment steps.
- Add tests and a GitHub Actions workflow that validates build/TypeScript/lint.

If something referenced here is deleted or moved, search for `logbooks`, `lib/firebase.ts`, `LogbookView`, or `app/logbook` to find the related code.

— End of instructions —
