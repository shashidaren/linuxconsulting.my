# LinuxConsulting.my

Main site hub for **linuxconsulting.my** (GitHub Pages) with sub-sites organised by folder.

## Structure

```
├── index.html          # Main hub page (linuxconsulting.my)
├── styles.css          # Hub styles
├── 404.html            # Hub 404 page
├── CNAME               # linuxconsulting.my
├── tech/               # Tech News MY sub-site
│   ├── index.html      #   Tech news home
│   ├── category.html   #   Category pages (?topic=local|global|ai|products|certs)
│   ├── 404.html
│   ├── styles.css
│   ├── scripts.js
│   └── *.json          #   RSS-backed news feeds
├── scripts/update_feeds.py        # Fetches RSS → writes tech/*.json
└── .github/workflows/update-news.yml  # Daily feed refresh (00:00 UTC)
```

## Where things live

| URL | Content |
| --- | --- |
| `linuxconsulting.my` | Hub / landing page (this repo, root) |
| `linuxconsulting.my/tech/` | Tech News MY (currently) |
| `tech.linuxconsulting.my` | Future home of Tech News MY (not wired up yet) |

## Moving Tech News MY to tech.linuxconsulting.my

GitHub Pages user sites serve one custom domain per repo, so to give the tech
site its own subdomain:

1. Create a **new repository** (e.g. `linuxconsulting-tech`) and enable GitHub
   Pages on it.
2. Copy the contents of `tech/` into that repo's root, add a `CNAME` file
   containing `tech.linuxconsulting.my`, and commit.
3. In your DNS provider, add a `CNAME` record:
   - **Name:** `tech`
   - **Value:** `<your-github-username>.github.io`
4. Point the GitHub Action in this repo's `tech/` copy at the new repo (or move
   `scripts/update_feeds.py` + the workflow there so feeds keep refreshing).

Until then, everything keeps working from `linuxconsulting.my/tech/`.

## Local development

Serve the repo root with any static server, e.g.:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` (hub) and `http://localhost:8080/tech/`
(tech news).

## Updating feeds manually

```bash
pip install feedparser
python3 scripts/update_feeds.py   # rewrites tech/*.json
```
