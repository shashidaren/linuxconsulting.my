# Handoff — linuxconsulting.my

A human-readable record of **everything that has changed on this site**, with
dates, so anyone (human or agent) can pick up the work without digging through
git history.

- **Compiled:** 2026-09-25 (UTC) on branch `arena/01a0d821-linuxconsulting-my`
- **Sources:** GitHub commit history, pull requests and file histories for
  [`shashidaren/linuxconsulting.my`](https://github.com/shashidaren/linuxconsulting.my).
  The local clone is shallow (single snapshot commit), so every date below was
  extracted from the GitHub API — they are exact commit/PR timestamps in **UTC**.
- **Scope:** the full history of the repository, from creation (2025-09-02) to
  today. The ~389 identical daily feed-refresh commits are summarised rather
  than listed one by one (Appendix B); every other commit is listed in
  Appendix A.

---

## At a glance

| When (UTC) | What happened |
|---|---|
| 2025-09-02 | Repository created; first site uploaded |
| 2025-09-05 | Tech News MY built (news category pages + RSS → JSON pipeline + GitHub Actions) |
| 2025-09-06 | Custom-domain (`CNAME`) wiring day — lots of churn, ends with the domain live |
| 2025-09-05 → today | 389 × `Auto-update news feeds` bot commits (daily RSS refresh) |
| 2026-08-20 | Site restructured: hub page at root, tech news moved to `/tech/`, light theme |
| 2026-09-08 | Consulting-first redesign: tabbed Portfolio/Projects/Contact, resume content, full services catalogue with imagery |
| 2026-09-09 | Smartphone-friendliness overhaul (responsive CSS, nav, touch targets) |
| 2026-09-25 | This handoff document added |

---

## What exists today

| URL | Content |
|---|---|
| `linuxconsulting.my` | Consulting hub — single page with hash-routed tabs: **Consulting · Portfolio · Projects · Contact** (`index.html`) |
| `linuxconsulting.my/tech/` | **Tech News MY** — RSS-backed news pages (`tech/`) |
| `linuxconsulting.my/404.html` | Hub 404 page |

Key files (see `README.md` for the full map):

| Path | Role |
|---|---|
| `index.html` | Consulting main page (hero, scope of services, portfolio, projects, contact) |
| `scripts.js` | Hash-routed tab navigation (`#consulting` … `#contact`), shareable URLs, back/forward support |
| `styles.css` | Site styles (dark navy + emerald design tokens) |
| `assets/img/services/` | 14 generated service images (cards, thumbnails, scope banner), ~720 KB total, stored in-repo |
| `tech/` | Tech News MY sub-site: `index.html`, `category.html`, `styles.css`, `scripts.js`, `404.html` + 5 JSON feeds |
| `scripts/update_feeds.py` | Fetches RSS sources → writes `tech/*.json` |
| `.github/workflows/update-news.yml` | Daily feed refresh at 00:00 UTC (plus manual dispatch) |
| `CNAME` | `linuxconsulting.my` (GitHub Pages custom domain) |

## How the moving parts work

- **Plain static site** — no build step. Serve the repo root with any static
  server (`python3 -m http.server 8080`) for local work. GitHub Pages rebuilds
  from `main` on every push (~1–2 min).
- **Feed pipeline** — `scripts/update_feeds.py` (needs `feedparser`) pulls 5
  feed groups (MY news, global news, AI news, products, free certificates) into
  `tech/*.json`. The GitHub Action runs it daily at 00:00 UTC, commits as
  `github-actions[bot]` with message `Auto-update news feeds`, and pushes.
  Manual run: Actions tab → *Update News Feeds* → *Run workflow*.
- **Future:** `tech.linuxconsulting.my` is planned for Tech News MY on its own
  subdomain; the migration steps are written up in `README.md`. Not wired up yet.

---

## Change log (detailed)

### 2026-09-25 — Handoff document added *(this change)*
- `handoff.md` created on branch `arena/01a0d821-linuxconsulting-my`. No site
  changes.

### 2026-09-09 · Make the site smartphone friendly — PR #23 *(merged 01:04)*
The pages had a viewport meta tag but almost no responsive CSS (one 9-line media
query on the hub, none under `tech/`). On phones: horizontal scrolling, a sticky
nav eating a third of the screen, and clipped hero text. Fixed:
- **Sticky nav** — hub tab bar and tech category bar now stay one row and swipe
  sideways instead of wrapping (hub header 143 px → 98 px at 320 px wide; tech
  nav 208 px → 48 px). Active tab scrolls into view. `flex-wrap: nowrap` +
  `justify-content: safe center` were the key fixes.
- **Horizontal overflow** — all 10 CSS grids moved from rigid
  `minmax(Npx, 1fr)` to `minmax(min(100%, Npx), 1fr)`; long tokens like
  `ghostlab.linuxconsulting.my` now wrap.
- **Clipped hero slider** (`tech/`) — slides were absolutely positioned inside a
  fixed-height clipped box (taller slides lost text); now stacked in one grid
  cell that grows with the tallest slide. Hidden slides are also hidden from
  screen readers.
- **Touch targets** — tabs/links/buttons ≥ 44 px at touch widths; new 480 px
  layout tier (tighter cards, full-width CTAs, smaller thumbnails).
- **Mobile payload** — phones fetch smaller Unsplash images (`w=640&…`), plus
  `preconnect` for cdnjs (render-blocking Font Awesome).
- **Drive-bys** — styled the previously unstyled `404.html` logo/tagline, removed
  a duplicate `.services-grid` rule, added `prefers-reduced-motion` support.
- Desktop (≥ 960 px) intentionally unchanged. Files: `404.html`, `index.html`,
  `scripts.js`, `styles.css`, `tech/404.html`, `tech/category.html`,
  `tech/index.html`, `tech/scripts.js`, `tech/styles.css`.

### 2026-09-08 · Full scope of services with dedicated imagery — PR #21 *(merged 23:50)*
Two commits (23:39 and 23:47). Rebuilt the Consulting tab from six summary cards
into a services catalogue:
- Scope banner ("one senior engineer — no junior hand-offs, no ticket queues").
- **10 image-led service cards** (managed Linux admin, monitoring & incident
  response, automation & config management, security hardening & compliance,
  backup/DR, virtualisation & private cloud incl. VMware → Proxmox, cloud
  migration, containers/K8s/CI-CD, web/mail/DNS/LB, DBA), each with photo,
  icon badge and an "includes" checklist.
- **"Also in scope"** — 8 specialist rows (3 with photo thumbnails); **"Ways to
  engage"** — project / retainer / emergency break-fix / advisory; **"Platforms
  we run"** chip strip.
- **14 generated images** added under `assets/img/services/` (optimised JPEGs,
  in-repo, no hotlinking). Files: `index.html`, `styles.css`, `README.md`,
  `assets/img/services/*`.

### 2026-09-08 · Consulting-first redesign with real portfolio — PR #20 *(merged 23:02)*
Three commits (22:49–22:59). The hub became the Consulting Services site:
- **22:49** `Redesign hub: consulting-first layout with tabbed sections` —
  `index.html` becomes the consulting main page (hero, services, engagement
  process) with hash-routed tabs **Portfolio · Projects · Contact**; Tech News
  stays at `/tech/`. New `scripts.js` for tab navigation (shareable URL hashes,
  back/forward). Portfolio initially filled with clearly marked placeholders.
- **22:54** `Fill portfolio with real resume content` — professional summary,
  career impact stats, experience timeline (Freelance → BAE Systems/Silversky →
  Xchanging 1Bestarinet → Asian Broadcasting Network → Teradata → earlier
  career), 6-group skills matrix, certifications/education; Projects tab with 7
  MSSP automation projects (2 linked to ghostlab writeups) + home-lab strip;
  consulting hero/cards tuned to actual specialities.
- **22:59** `Remove phone number per owner request` — contact is email-only; the
  Call/WhatsApp card and `tel:` footer link were dropped again. Avatar stays
  generic (no photo).
- Files: `README.md`, `index.html`, `scripts.js`, `styles.css`.

### 2026-08-20 · News card readability fix — PR #19 *(merged 19:13)*
Headlines on the tech hub's image cards were dark text on dark photos.
`tech/styles.css` scopes news-list text inside `.card-with-image` to white;
`tech/scripts.js` strengthens the card overlay to a 60–82 % dark-navy gradient.
Category pages (white background) unaffected.

### 2026-08-20 · Restructure: hub at root, tech news to `/tech/`, light theme — PR #18 *(merged 18:53)*
The big reorganisation (629 additions / 160 deletions):
- **New hub page at `/`** — landing page linking to Tech News MY and
  coming-soon placeholders (Consulting Services, Tools & Projects).
- **Tech news moved to `tech/`** — pages, scripts and JSON feeds now live under
  `tech/`, served at `linuxconsulting.my/tech/`; README documents the future
  move to `tech.linuxconsulting.my`.
- **Light theme for tech news** (emerald accent on light surfaces) replacing the
  old grey `#333`/`#444` look; hub + 404s restyled to match.
- `scripts/update_feeds.py` now writes into `tech/`.
- **18:51** (between the two PRs) the workflow's `git add` path was fixed to
  `tech/*.json` — the one-line change the PR body flagged as required so the
  feeds wouldn't go stale after the move.

### 2025-09-05 → 2026-09-25 · Feed automation era *(ongoing)*
389 commits titled `Auto-update news feeds` by `github-actions[bot]`, one
roughly every day at ~00:00–02:30 UTC. **First:** 2025-09-05 22:06 (the same
evening the workflow went live). **Most recent:** 2026-09-25 02:37. These touch
only `tech/*.json` (root `*.json` before the 2026-08-20 restructure). See
Appendix B.

### 2025-09-06 · Custom-domain wiring day *(02:57–07:16)*
Getting `linuxconsulting.my` working on GitHub Pages took a burst of rapid
iterations (PRs #10–#17, plus ~25 commits that only create/update/delete
`CNAME` — GitHub Pages drops a CNAME committed through its UI, so it kept being
re-created). Notable moments:
- 02:59 `newdesign` (#10) — site refresh + `update_feeds.py` tweak, CNAME
  removed.
- 05:21–05:22 **full wipe and restore** — `Delete all files to start from
  scratch` followed a minute later by `Add fresh site files without CNAME`
  (fresh start to drop the CNAME cleanly).
- 05:57–07:08 quick experimental merges (#13–#17); 07:08 `add` (#17) restores
  the workflow file and `update_feeds.py` content (see file histories).
- 07:16 `Create CNAME` — final state that stuck. The day ends with the site
  live on the custom domain.

### 2025-09-05 · Tech News MY built + automation wired up *(11:05–22:06)*
The busiest build day (PRs #2–#9):
- 11:05 `new_site` (#2) — adds `blog.html`, `courses.html`, `hardware.html`,
  `scripts.js`; first content pages beyond the hub.
- 11:10–11:15 — GitHub Actions workflows created (`update-hardware.yml`,
  `update-courses.yml`) and `scripts.js` updated.
- 12:04 `new_site2` (#3) — JSON feeds land (`courses.json`, `hardware.json`,
  `llm-gpus.json`); `backup/` folder removed.
- 17:31 `redesign` (#4) — visual redesign of all pages.
- 21:17 `redesign2` (#5) — **the shape that survives to this day**: news
  category pages (`malaysia-news`, `global-news`, `ai-news`, `products`,
  `certifications`) with matching JSON feeds (`news_local`, `news_global`,
  `ai_news`, `products`, `certs`); blog/courses/hardware dropped.
- 21:27–21:47 — workflows consolidated: `update-courses.yml` renamed to
  `update-news.yml`, `update-hardware.yml` deleted (`redesign3`), workflow
  tuned (`redesign4`).
- 21:55 `update_feeds.py` added for GitHub Actions (#8).
- 22:04 workflow permissions/token fixed (#9) → **22:06 first auto feed
  commit** — the pipeline has run ever since.

### 2025-09-02 · Repository born *(10:09–12:57)*
- 10:09 repository `shashidaren/linuxconsulting.my` created.
- 10:12 `Add files via upload` — first site: `index (1).html`, `styles.css`,
  `README.md`, `DEPLOYMENT.md`.
- 10:36 `changes` (#1) — first tweak to `index.html`.
- 12:30–12:57 `CNAME` created and `index.html` updated twice — first attempt at
  the custom domain.

---

## Pull request index (all)

| PR | Opened (UTC) | Merged (UTC) | From | Title |
|---|---|---|---|---|
| #23 | 2026-09-09 01:03 | 2026-09-09 01:04 | arena session | Make the site smartphone friendly |
| #22 | 2026-09-09 00:01 | — never merged | `main` | (stray PR — see Open items) |
| #21 | 2026-09-08 23:49 | 2026-09-08 23:50 | arena session | Expand Consulting tab into a full scope of services with dedicated imagery |
| #20 | 2026-09-08 23:02 | 2026-09-08 23:02 | arena session | Redesign: consulting-first homepage with tabbed portfolio |
| #19 | 2026-08-20 19:09 | 2026-08-20 19:13 | arena session | Fix news card text readability on tech hub |
| #18 | 2026-08-20 18:38 | 2026-08-20 18:53 | arena session | Restructure: hub at root, tech news to tech/, light theme redesign |
| #17 | 2025-09-06 07:02 | 2025-09-06 07:08 | `aaa` | add |
| #16 | 2025-09-06 05:57 | 2025-09-06 05:57 | `newone` | newone |
| #15 | 2025-09-06 04:55 | 2025-09-06 05:01 | `removec` | removec |
| #14 | 2025-09-06 04:42 | — never merged | `assh3` | assh3 |
| #13 | 2025-09-06 04:31 | 2025-09-06 04:31 | `assh2` | assh2 |
| #12 | 2025-09-06 04:09 | 2025-09-06 04:09 | `assh` | assh |
| #11 | 2025-09-06 03:45 | 2025-09-06 03:45 | `fyou` | fu |
| #10 | 2025-09-06 02:57 | 2025-09-06 02:59 | `redesign7` | newdesign |
| #9 | 2025-09-05 22:05 | 2025-09-05 22:05 | `redesign6` | Fix Actions workflow permissions and token for auto-update |
| #8 | 2025-09-05 21:56 | 2025-09-05 21:56 | `redesign5` | Add update_feeds.py script for GitHub Actions |
| #7 | 2025-09-05 21:47 | 2025-09-05 21:48 | `redesign4` | redesign4 |
| #6 | 2025-09-05 21:35 | 2025-09-05 21:36 | `redesign3` | redesign3 |
| #5 | 2025-09-05 21:18 | 2025-09-05 21:18 | `redesign2` | redesign2 |
| #4 | 2025-09-05 17:31 | 2025-09-05 17:31 | `redesign` | redesign |
| #3 | 2025-09-05 12:05 | 2025-09-05 12:05 | `new_site2` | new_site2 |
| #2 | 2025-09-05 11:06 | 2025-09-05 11:06 | `new_site` | new_site |
| #1 | 2025-09-02 10:38 | 2025-09-02 10:38 | `changes` | changes |

*(#1–#17 are the owner's rapid 2025 experiments — titles are the original
branch names. #18–#23 are the substantive 2026 work, each authored in an Arena
agent session and merged by `arena-ai-coding-agent[bot]`.)*

## Open items & watch-outs

- **PR #22 is still open and should be closed, not merged** — it was opened
  from `main` with the title "Merge pull request #21…"; it carries no new work.
- **`tech.linuxconsulting.my` subdomain not wired up** — migration plan is in
  `README.md` (new repo + DNS CNAME + moving the feed pipeline).
- **The local clone is shallow** (1 commit). For history, use
  `gh api repos/shashidaren/linuxconsulting.my/commits --paginate` or the
  GitHub UI — that's where the dates in this document came from.
- **Feed sources are external** — `scripts/update_feeds.py` depends on third-
  party RSS URLs (lowyat.net, soyacincau.com, TechCrunch, The Verge,
  artificialintelligence-news.com, syncedreview.com, aibusiness.com, GSMArena,
  Class Central); upstream feed changes will silently drop items.
- **Contact is deliberately email-only** (phone removed 2026-09-08 per owner
  request — don't re-add). Avatar is deliberately generic (no photo).
- Desktop design (≥ 960 px) is considered stable after the 2026-09-09 mobile
  work; any future redesign should keep type sizes capped at current values.

---

## Appendix A — every non-automated commit

All 88 commits other than the daily `Auto-update news feeds` bot commits,
newest first. " ⏎ " in long messages is a line break in the original commit
message. (Full messages: GitHub → commits list.)

| Date (UTC) | Commit | Author | Summary |
|---|---|---|---|
| 2026-09-09 01:04:36 | `206f7785` | arena-ai-coding-agent[bot] | Merge pull request #23 from shashidaren/arena/01a083a0-linuxconsulting-my |
| 2026-09-09 01:02:48 | `5d331b4b` | shashidaren | Make the site smartphone friendly |
| 2026-09-08 23:50:14 | `3d0bd0af` | arena-ai-coding-agent[bot] | Merge pull request #21 from shashidaren/arena/01a0835c-linuxconsulting-my |
| 2026-09-08 23:47:05 | `be356a9c` | shashidaren | Complete service imagery: thumbnails for specialist scope + dedicated banner |
| 2026-09-08 23:39:53 | `4402b677` | shashidaren | Expand consulting scope of services with dedicated imagery |
| 2026-09-08 23:02:54 | `49c6733a` | arena-ai-coding-agent[bot] | Merge pull request #20 from shashidaren/arena/01a08331-linuxconsulting-my |
| 2026-09-08 22:59:44 | `0cde2104` | shashidaren | Remove phone number from site per owner request |
| 2026-09-08 22:54:52 | `e9acdfea` | shashidaren | Fill portfolio with real resume content for Shashidaren |
| 2026-09-08 22:49:29 | `1b25d628` | shashidaren | Redesign hub: consulting-first layout with tabbed sections |
| 2026-08-20 19:13:03 | `320a44f3` | arena-ai-coding-agent[bot] | Merge pull request #19 from shashidaren/arena/01a02090-linuxconsulting-my |
| 2026-08-20 19:09:26 | `c8b37669` | shashidaren | Fix news card readability: light text and stronger overlay on image cards |
| 2026-08-20 18:53:22 | `cbc2e86d` | arena-ai-coding-agent[bot] | Merge pull request #18 from shashidaren/arena/01a02069-linuxconsulting-my |
| 2026-08-20 18:51:50 | `39ce89aa` | daily-brief | Change git add path to tech/*.json for updates |
| 2026-08-20 18:26:55 | `dd63b578` | shashidaren | Restructure: hub page at root, tech news moved to tech/, light theme redesign |
| 2025-09-06 07:16:50 | `146b5bff` | daily-brief | Create CNAME |
| 2025-09-06 07:16:29 | `e5264d41` | daily-brief | Delete CNAME |
| 2025-09-06 07:15:01 | `89a34f59` | daily-brief | Create CNAME |
| 2025-09-06 07:13:26 | `34b4b84c` | daily-brief | Delete CNAME |
| 2025-09-06 07:09:36 | `e661eb05` | daily-brief | Create CNAME |
| 2025-09-06 07:08:59 | `03efa645` | daily-brief | add (#17) |
| 2025-09-06 05:59:08 | `5f0c690e` | daily-brief | Create CNAME |
| 2025-09-06 05:57:21 | `3e96e96d` | daily-brief | newone (#16) |
| 2025-09-06 05:48:19 | `19021784` | daily-brief | Update CNAME |
| 2025-09-06 05:48:10 | `d04eba20` | daily-brief | Update CNAME |
| 2025-09-06 05:26:23 | `0cfd6860` | daily-brief | Create CNAME |
| 2025-09-06 05:22:33 | `8e508c52` | shashi | Add fresh site files without CNAME |
| 2025-09-06 05:21:12 | `c9423729` | shashi | Delete all files to start from scratch |
| 2025-09-06 05:18:50 | `e970e984` | daily-brief | Delete CNAME |
| 2025-09-06 05:10:48 | `08f5b424` | daily-brief | Create CNAME |
| 2025-09-06 05:07:55 | `6c095e07` | shashi | Remove CNAME file |
| 2025-09-06 05:05:05 | `2cc8c289` | daily-brief | Create CNAME |
| 2025-09-06 04:54:51 | `73c4847e` | shashi | removec |
| 2025-09-06 04:39:24 | `56c4a950` | daily-brief | Create CNAME |
| 2025-09-06 04:31:50 | `9428efb1` | daily-brief | assh2 (#13) |
| 2025-09-06 04:15:59 | `754f2abb` | daily-brief | Update CNAME |
| 2025-09-06 04:15:47 | `0cc3900f` | daily-brief | Update CNAME |
| 2025-09-06 04:10:50 | `b4cf3e9b` | daily-brief | Create CNAME |
| 2025-09-06 04:09:22 | `b8ce82da` | daily-brief | assh (#12) |
| 2025-09-06 03:48:08 | `b83d0c03` | daily-brief | Create CNAME |
| 2025-09-06 03:45:50 | `0048f1e0` | daily-brief | fu (#11) |
| 2025-09-06 03:34:38 | `fa252337` | daily-brief | Update CNAME |
| 2025-09-06 03:34:29 | `94d07eb5` | daily-brief | Update CNAME |
| 2025-09-06 03:13:47 | `bfd2c97e` | daily-brief | Update CNAME |
| 2025-09-06 03:13:33 | `2f3a6ace` | daily-brief | Update CNAME |
| 2025-09-06 03:00:33 | `58f132f2` | daily-brief | Create CNAME |
| 2025-09-06 02:59:16 | `c67d553b` | daily-brief | newdesign (#10) |
| 2025-09-05 22:05:20 | `dc7e95bc` | daily-brief | Merge pull request #9 from shashidaren/redesign6 |
| 2025-09-05 22:04:24 | `a973a38c` | shashi | Fix Actions workflow permissions and token for auto-update |
| 2025-09-05 21:56:32 | `6a643a80` | daily-brief | Merge pull request #8 from shashidaren/redesign5 |
| 2025-09-05 21:55:45 | `5567a4fa` | shashi | Add update_feeds.py script for GitHub Actions |
| 2025-09-05 21:49:04 | `4867be46` | daily-brief | Update CNAME |
| 2025-09-05 21:48:53 | `a430fe21` | daily-brief | Update CNAME |
| 2025-09-05 21:48:22 | `c5268553` | daily-brief | Merge pull request #7 from shashidaren/redesign4 |
| 2025-09-05 21:47:15 | `f9295923` | shashi | redesign4 |
| 2025-09-05 21:38:21 | `924dedb8` | daily-brief | Update CNAME |
| 2025-09-05 21:37:53 | `2693fc71` | daily-brief | Update CNAME |
| 2025-09-05 21:37:45 | `3b1b2d42` | daily-brief | Update CNAME |
| 2025-09-05 21:36:53 | `e249ed53` | daily-brief | Create CNAME |
| 2025-09-05 21:35:59 | `7e82dd00` | daily-brief | Merge pull request #6 from shashidaren/redesign3 |
| 2025-09-05 21:35:13 | `098b001e` | shashi | redesign3 |
| 2025-09-05 21:27:06 | `98fcf500` | daily-brief | Update and rename update-courses.yml to update-news.yml |
| 2025-09-05 21:18:43 | `ba97ffa4` | daily-brief | Merge pull request #5 from shashidaren/redesign2 |
| 2025-09-05 21:17:35 | `b02eb196` | shashi | redesign2 |
| 2025-09-05 18:03:20 | `3b19554b` | daily-brief | Update update-courses.yml |
| 2025-09-05 17:44:16 | `b760b648` | daily-brief | Update update-courses.yml |
| 2025-09-05 17:36:03 | `be2d2ec9` | daily-brief | Update update-courses.yml |
| 2025-09-05 17:32:43 | `0e9cad90` | daily-brief | Create CNAME |
| 2025-09-05 17:31:53 | `1804356d` | daily-brief | Merge pull request #4 from shashidaren/redesign |
| 2025-09-05 17:31:10 | `edf5bece` | shashi | redesign |
| 2025-09-05 16:42:25 | `0a302f50` | daily-brief | Update CNAME |
| 2025-09-05 16:42:10 | `e678b3fc` | daily-brief | Update CNAME |
| 2025-09-05 16:35:36 | `7edb413f` | daily-brief | Update update-hardware.yml |
| 2025-09-05 16:34:47 | `af562a45` | daily-brief | Update update-courses.yml |
| 2025-09-05 12:08:41 | `69b52d3d` | daily-brief | Create CNAME |
| 2025-09-05 12:05:14 | `e75a758a` | daily-brief | Merge pull request #3 from shashidaren/new_site2 |
| 2025-09-05 12:04:13 | `3028fd94` | shashi | new_site2 |
| 2025-09-05 11:15:07 | `a39d2b34` | daily-brief | Update scripts.js |
| 2025-09-05 11:12:10 | `a423d31c` | daily-brief | Create update-courses.yml |
| 2025-09-05 11:10:52 | `d0f688a5` | daily-brief | Create update-hardware.yml |
| 2025-09-05 11:06:53 | `22fba344` | daily-brief | Merge pull request #2 from shashidaren/new_site |
| 2025-09-05 11:05:37 | `99bef83a` | shashi | new_site |
| 2025-09-05 02:57:39 | `9c83e6a9` | daily-brief | Update CNAME |
| 2025-09-02 12:46:26 | `64184817` | daily-brief | Update index.html |
| 2025-09-02 12:43:15 | `9f96e097` | daily-brief | Update index.html |
| 2025-09-02 12:30:25 | `c5c6310c` | daily-brief | Create CNAME |
| 2025-09-02 10:38:21 | `fda25b29` | daily-brief | Merge pull request #1 from shashidaren/changes |
| 2025-09-02 10:36:54 | `5a9cfa8e` | shashi | changes |
| 2025-09-02 10:12:52 | `3ee6597b` | daily-brief | Add files via upload |

## Appendix B — automated feed updates

| | |
|---|---|
| Commit message | `Auto-update news feeds` (always) |
| Author | `github-actions[bot]` |
| Count | 389 |
| First | 2025-09-05 22:06:36 UTC |
| Most recent | 2026-09-25 02:37:09 UTC |
| Schedule | Daily, 00:00 UTC (`.github/workflows/update-news.yml`), also triggerable manually |
| Files touched | `tech/*.json` (root `*.json` before 2026-08-20) |
| Generated by | `scripts/update_feeds.py` (feedparser) from the RSS sources listed there |

They are excluded from Appendix A because they are identical, machine-made and
~80 % of the repository's history; the first and last above bracket the era.

---

*This document was compiled on 2026-09-25 (UTC) from the GitHub history of
`shashidaren/linuxconsulting.my`. To keep it current, add a dated entry to the
change log whenever something meaningful changes — the appendices can be
regenerated from `gh api repos/shashidaren/linuxconsulting.my/commits --paginate`.*
