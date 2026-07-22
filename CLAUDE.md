# Editing Guide

Personal site for Prerit Ahuja. **Single page**, built with Hugo (no theme), deployed to
GitHub Pages via `.github/workflows/hugo.yml` on push to `main`. Custom domain:
`preritahuja.com` (set in the repo's Pages settings; the artifact does not carry a CNAME).

Everything lives on the home route. Sections in order: Hero (`#top`), About (`#about`),
Selected Proof (`#proof`), Research & Writing (`#research`), Speaking (`#speaking`),
Recognition (`#recognition`), Contact (`#contact`), footer.

## Where to edit what

### Content you will actually change → `data/*.yaml`
These drive the page directly. Edit the YAML, rebuild, done. No layout changes needed.

- `data/proof.yaml` — Selected Proof tiles (`phrase` + `detail`)
- `data/research.yaml` — publications: `intro`, then `entries` (title, author, year, venue,
  description, optional `pullquote`, `licence`, and a `links` list where one link may be
  `primary: true` to render as a button)
- `data/speaking.yaml` — `intro`, `upcoming`, `past`. Grouping is **manual, not date-driven**:
  when an event passes, move the entry from `upcoming` to `past`.
- `data/recognition.yaml` — awards (`award` + `body`; optional `muted: true` for a
  lower-key line)

### About prose → `content/_index.md`
The body markdown renders into the About section. Front matter `aliases` emit redirect
stubs for retired routes.

### Hero, meta, identifiers → `hugo.toml`
`[params.hero]` (headline, subheadline, microline), `description` (used for meta, OG and
Twitter), `linkedin`, `orcid`, `headshot`, and `[[params.nav]]` (nav label + anchor; add an
entry here and a matching `id` in the layout to add a section).

### Layout / styling
- `layouts/home.html` — the whole page
- `layouts/404.html`
- `assets/css/main.css` — tokens at the top (`:root`, plus dark overrides for both
  `prefers-color-scheme` and `[data-theme]`); edit colours in one place
- `assets/js/main.js` — theme toggle, mobile nav, scroll-spy, reveal-on-scroll, email decode

CSS and JS go through Hugo's asset pipeline (minified + fingerprinted), so cache busting is
automatic.

## Contact email is obfuscated — do not paste it in plaintext

The address is stored XOR-hex encoded in `hugo.toml` as `params.emailEncoded` and decoded by
`main.js` at runtime, so the served HTML contains no readable address. After changing the
address, regenerate it:

```bash
node -e 'const e="you@example.com",k=0x5b;let o=k.toString(16).padStart(2,"0");
for(const c of e)o+=(c.charCodeAt(0)^k).toString(16).padStart(2,"0");console.log(o)'
```

## Fonts

Self-hosted in `static/fonts/`, preloaded in the layout. Inter (UI/body) is the stock Google
latin subset. Source Serif 4 (headings, pull-quote, wordmark) is a **variable-weight subset**
(49KB rather than 122KB) covering ASCII, typographic punctuation and European/Nordic accents.

If you ever need a character outside that set in a heading, regenerate the subset — request
the `wght` axis only (asking for the `opsz` axis makes Google return the full 122KB face):

```
https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600&display=swap&text=<urlencoded chars>
```

Download the `woff2` it points at, replace `static/fonts/source-serif-4-latin-var.woff2`, and
copy the returned `unicode-range` into the `@font-face` block in `assets/css/main.css`.

## Old routes

The retired multi-page routes (`/about/`, `/publications/`, `/insights/`, `/talks/`, and the
old talk/insight detail pages) are served as redirect stubs from `static/`, each with a
`canonical` and a meta refresh to the matching anchor. GitHub Pages cannot issue real 301s;
this is the static equivalent. Add a stub if you retire another route.

## Deployment

- Push to `main` → GitHub Actions runs `hugo --minify` → uploads `./public` → deploys to Pages
- Build pins Hugo **0.156.0 extended** (`HUGO_VERSION` in the workflow)
- `public/` is committed but CI rebuilds it; keep it in sync by running `hugo --minify`
  before committing
- CDN cache TTL is 600s; hard refresh if you don't see changes after ~10 min

## Gotchas

- **JSON-LD**: values interpolated inside `<script>` need `| safeJS`, otherwise Go's
  contextual escaping re-encodes the JSON as a quoted JS string and the structured data breaks.
- **Line endings**: this repo is checked out on Windows. `git config core.autocrlf input` is
  set locally so CRLF working-tree files don't show up as whole-file diffs.
- **Reveal-on-scroll** hides sections until scrolled into view, but only when JS is present
  (the `.js` class is set by an inline head script). Without JS everything stays visible.
