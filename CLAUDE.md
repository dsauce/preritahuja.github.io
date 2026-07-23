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
- `data/recognition.yaml` — awards (`award`, `body`, optional `url` and `detail`).
  `muted: true` moves an entry out of the lead card and under the **Previous Awards**
  sub-header, rendered smaller. Entries without it are lead cards.

### About prose → `content/_index.md`
The body markdown renders into the About section. Front matter `aliases` emit redirect
stubs for retired routes.

### Hero, meta, identifiers → `hugo.toml`
`[params.hero]` (headline, subheadline, microline), `description` (used for meta, OG and
Twitter), `linkedin`, `orcid`, `headshot`.

`[[params.nav]]` drives the sticky section nav, in order.

| field    | used for |
| -------- | -------- |
| `name`   | label in the nav strip |
| `title`  | full section heading |
| `anchor` | section `id` |
| `cue`    | hero scroll-cue wording (first entry only) |
| `cta`    | hero button label (first entry only) |

To add a section: add a nav entry and add the matching `<section id="…">` to the layout.

### Layout / styling
- `layouts/home.html` — the whole page
- `layouts/_partials/scroll-cue.html` — the hero scroll affordance
- `layouts/404.html`
- `assets/css/main.css` — tokens at the top (`:root`, plus dark overrides for both
  `prefers-color-scheme` and `[data-theme]`); edit colours in one place
- `assets/js/main.js` — theme toggle, scroll-spy, scroll-progress bar, reveal-on-scroll

CSS and JS go through Hugo's asset pipeline (minified + fingerprinted), so cache busting is
automatic.

## No email address on this site

The contact route is LinkedIn only. There is deliberately **no email address anywhere** —
not plaintext, not obfuscated, not behind JavaScript, not a form, not a domain alias. If you
are asked to add a contact method, add it alongside LinkedIn; do not reintroduce an address.

Do not construct a LinkedIn deep messaging link either (`/messaging/thread/new/?recipient=`
and similar). Those need an authenticated session and commonly dump the visitor into their
own inbox. Link to the profile URL; the Message control is visible on arrival.

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

## Navigation and spacing

- The section nav is **always visible**, including on mobile, where it becomes a
  horizontally scrollable strip on a second header row. There is no hamburger. The active
  chip scrolls itself into view; at the top of the page the strip resets to the first chip.
- **Anchor offsets** use `--header-now`, which `main.js` sets from the measured header
  height on load and resize. The mobile header is two rows and therefore taller than the
  desktop one, so a fixed value would misplace anchored headings.
- **Only the hero has a scroll cue.** Inter-section spacing (`--section-y`) is deliberately
  tight so the next heading peeks above the fold; that is the scroll signal everywhere else.
  If you increase `--section-y`, re-check that the next heading still peeks at 375x812.

## Gotchas

- **JSON-LD**: values interpolated inside `<script>` need `| safeJS`, otherwise Go's
  contextual escaping re-encodes the JSON as a quoted JS string and the structured data breaks.
- **Line endings**: this repo is checked out on Windows. `git config core.autocrlf input` is
  set locally so CRLF working-tree files don't show up as whole-file diffs.
- **Reveal-on-scroll** hides sections until scrolled into view, but only when JS is present
  (the `.js` class is set by an inline head script). Without JS everything stays visible.
