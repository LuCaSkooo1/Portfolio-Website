# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **bun** (see `bun.lock`), but `npm`/`pnpm` also work — the scripts only call `next`.

- `bun dev` — start dev server (Next.js with Turbopack) at http://localhost:3000
- `bun run build` — production build (also uses Turbopack)
- `bun start` — serve the production build

There is **no lint script, no test suite, and no typecheck script** defined. If you need to typecheck, run `bunx tsc --noEmit` directly.

## Architecture

Next.js 15 (App Router) + React 19 + Tailwind v4 + TypeScript. Portfolio site with two case-study routes (`/ksk`, `/navody`) plus `/about` and `/contact`. All pages are client components (`"use client"`) because they consume the language and theme contexts.

### Providers (app/layout.tsx)

The root layout wraps every page in two providers, order matters:
1. `ThemeProvider` from `next-themes` — `attribute="class"`, `defaultTheme="light"`, `enableSystem`. Dark mode is toggled by adding `.dark` to `<html>`.
2. `LanguageProvider` from `app/lib/useTranslation.tsx` — custom i18n context (see below).

`<Header />` and `<Footer />` are also rendered here, so pages should not include their own nav/footer.

### i18n (app/lib/useTranslation.tsx + app/locales/{en,sk}.json)

Custom client-side i18n — **not** a library. Two JSON files are imported statically and looked up via dot-notation keys (`t("work.hero.title")`). The `NestedKeyOf` type gives compile-time key checking against the shape of `en.json`, so **keep `en.json` and `sk.json` in sync** — new keys must be added to both. Default language is `sk`; the current selection is persisted to `localStorage` under `preferred-language`. When adding UI copy, add both translations rather than hardcoding strings.

### Theming (app/globals.css)

Tailwind v4 with `@import "tailwindcss"` and `@custom-variant dark (&:is(.dark *))`. All colors live as CSS variables in OKLCH under `:root` (light) and `.dark`. There is also a legacy `tailwind.config.js` with `darkMode: "class"` and font-family aliases — Tailwind v4 mostly reads from `globals.css`, but the config still supplies the `font-jakarta` / `font-grotesk` utilities. Custom hero gradient classes (`.hero`, `.hero-ksk`, `.hero-guides`) are defined in `globals.css` and used by page components.

Fonts are loaded via `next/font/google` in `layout.tsx` (Plus Jakarta Sans, Space Grotesk) and exposed as CSS variables. `globals.css` applies Plus Jakarta to `h1`/`h2` and Space Grotesk to `p`/`h3` by default.

### UI components (app/components/ui/)

shadcn-style primitives (`Button`, `Input`, `Textarea`, `Carousel`, `CPSCard`, `UserPersona`, `TextBadge`) built with `class-variance-authority` and `@radix-ui/react-slot`. Use the `cn()` helper from `app/lib/utils.ts` (`clsx` + `tailwind-merge`) whenever composing class names. `Carousel` wraps `embla-carousel-react`. Higher-level composite components (`CaseStudies`, `FigmaProjects`, `GalleryNavody`, `Header`, `Footer`, `UserFlow`) live directly under `app/components/`.

### Path alias

`@/*` maps to the project root (see `tsconfig.json`). Imports inside `app/` mostly use relative paths (`../lib/...`), which is the existing convention.

### Contact form

`app/contact/page.tsx` uses `@emailjs/browser` with the EmailJS public key and template IDs hardcoded in the file. This is intentional — EmailJS public keys are safe on the client. Do not "move them to env vars" unless the user asks.

### Assets

All images and CVs are static files in `public/`. Case-study pages reference them by absolute path (`/kosice-logo.png`, `/cv_en_web.pdf`, etc.). The current CV path is also stored in the translation JSON under `cv.path` so the correct language file is served.
