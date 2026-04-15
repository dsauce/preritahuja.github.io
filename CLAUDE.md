# Editing Guide

Personal site for Prerit Ahuja. Hugo static site, `coder` theme (submodule), deployed to GitHub Pages via `.github/workflows/hugo.yml` on push to `main`. Custom domain: `preritahuja.com`.

## Where to edit what

### Site-wide settings → `hugo.toml`
- **Title, author, tagline** — `title`, `[params].author`, `[params].info`
- **Avatar** — `[params].avatarURL` (file lives in `static/images/`)
- **Social icons** (homepage + footer) — `[[params.social]]` blocks. Each supports `name`, `icon`, `weight`, `url`, `target`, `rel`. Use `target = "_blank"` + `rel = "noopener noreferrer"` to open in a new tab.
- **Top navigation menu** — `[[menu.main]]` blocks
- **Future-dated content** — `buildFuture = true` is set so upcoming talks appear before their date

### Pages → `content/`
- `content/about/_index.md` — About page body
- `content/insights/_index.md` — Insights list page
- `content/talks/_index.md` — Talks list page intro
- `content/posts/_index.md` — Posts list

### Adding a talk → new file in `content/talks/`
Filename: kebab-case, e.g. `event-name-city-2026.md`. Frontmatter:

```yaml
---
title: "Speaker - Event Name Year"          # prefix with "[Upcoming] " for future events
date: 2026-06-17                              # event date (drives list ordering)
description: "One-line summary for SEO."
tags: ["AI","Capital Markets"]                # include "Upcoming" tag for future events
keywords: ["search term", "another term"]
---

Body in markdown. Images go in `static/images/` and reference as `/images/foo.png`.
```

Talks list (`/talks/`) orders by `date` desc. Future dates are included because `buildFuture = true`.

### Adding an insight → new file in `content/insights/`
Same frontmatter shape as talks.

## Homepage composition
The homepage is rendered by the theme's `home.html` — no content file drives it. It shows: avatar → site title → `info` tagline → social icons. To add items below social icons, create `content/_index.md` (theme renders its body) or override `layouts/home.html`. A draft exists at `content/temp_index.md` — rename to `_index.md` to activate, and verify the theme version renders `.Content` on home (may need `layouts/home.html` override).

## Theme overrides
Coder theme uses Hugo's new convention: `_partials/` (underscore prefix). To override a theme partial, mirror its path under the repo's `layouts/`:

- Theme: `themes/coder/layouts/_partials/home/social.html`
- Override: `layouts/_partials/home/social.html`

**Before overriding, check the theme partial first** — many accept config params (e.g. social entries support `target`, `rel`, `type` directly from `hugo.toml`). Config is preferable to template forks.

## Deployment
- Push to `main` → GitHub Actions runs `hugo --minify` → uploads `./public` → deploys to Pages
- CI runs with `submodules: recursive`, so theme is fetched fresh each build
- `public/` is committed but CI ignores it at deploy time (builds fresh)
- CDN cache TTL is 600s; hard refresh if you don't see changes after ~10 min

## Common gotchas
- **Future-dated content** missing from build → check `buildFuture = true` in `hugo.toml`
- **Override not applying** → verify path matches the theme exactly, including `_partials/` prefix and any subdirectory (e.g. `home/`)
- **Site shows "Website under construction"** → that's the root `index.html`; not served by Pages (Pages serves the Hugo build from `public/`)
