"""
Daily RSS feed updater for Tech News MY.

This script pulls recent articles from a list of RSS feeds for each
category and writes a JSON file containing the top stories. For
categories with multiple feeds, it merges all entries and sorts them by
publication date to ensure the freshest items are selected. To run the
script, install the ``feedparser`` library and invoke ``python
update_feeds.py`` from the repository root. This script is intended to
be used in conjunction with a GitHub Actions workflow for automated
updates.
"""

import feedparser
import json
import time

# Define RSS feeds for each section. You can add or remove feed URLs
# depending on your needs.
FEEDS = {
    "news_local.json": [
        "https://www.lowyat.net/feed/",
        "https://soyacincau.com/feed/"
    ],
    "news_global.json": [
        "https://techcrunch.com/feed/",
        "https://www.theverge.com/rss/index.xml"
    ],
    "ai_news.json": [
        # Expanded list of AI news feeds for better coverage
        "https://www.artificialintelligence-news.com/feed/",
        "https://syncedreview.com/feed/",
        "https://aibusiness.com/feed/",
        "https://www.marktechpost.com/feed/"
    ],
    "products.json": [
        # Gadget and hardware news feed
        "https://www.gsmarena.com/rss-news-reviews.php3"
    ],
    "certs.json": [
        # Feed of free certificate courses and training deals
        "https://www.classcentral.com/collection/feed/free-certificates"
    ],
}


def fetch_feed_entries(feed_urls, limit=5):
    """Fetch and merge entries from a list of RSS feeds.

    Returns a list of dictionaries with ``title`` and ``link`` keys,
    sorted by publication date (newest first). Only the first ``limit``
    entries are returned after sorting.
    """
    entries = []
    for url in feed_urls:
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries:
                published = entry.get("published_parsed") or entry.get("updated_parsed")
                entries.append({
                    "title": entry.get("title", ""),
                    "link": entry.get("link", ""),
                    "published_parsed": published,
                })
        except Exception as e:
            # Log the error but continue with other feeds
            print(f"Error fetching {url}: {e}")
    # Sort by publication date, falling back to oldest if None
    entries_sorted = sorted(
        entries,
        key=lambda x: x["published_parsed"] or time.gmtime(0),
        reverse=True,
    )
    # Trim to the desired number of items and drop parsing info
    top_items = [
        {"title": e["title"], "link": e["link"]}
        for e in entries_sorted[:limit]
    ]
    return top_items


def main():
    for filename, urls in FEEDS.items():
        items = fetch_feed_entries(urls, limit=5)
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(items, f, ensure_ascii=False, indent=2)
        print(f"Updated {filename} with {len(items)} items.")


if __name__ == "__main__":
    main()