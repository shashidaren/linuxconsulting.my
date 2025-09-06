import feedparser
import json
import time
import os

# Define RSS feeds for each section
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
        "https://www.artificialintelligence-news.com/feed/",
        "https://syncedreview.com/feed/",
        "https://aibusiness.com/feed/"
    ],
    "products.json": [
        "https://www.gsmarena.com/rss-news-reviews.php3"
    ],
    "certs.json": [
        "https://www.classcentral.com/collection/feed/free-certificates"
    ],
}

def fetch_feed_entries(feed_urls, limit=10):
    entries = []
    for url in feed_urls:
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries:
                published = entry.get("published_parsed") or entry.get("updated_parsed")
                entries.append({
                    "title": entry.title,
                    "link": entry.link,
                    "published_parsed": published,
                })
        except Exception as e:
            print(f"Error fetching {url}: {e}")

    entries.sort(key=lambda x: x["published_parsed"] or time.gmtime(0), reverse=True)

    return [{"title": e["title"], "link": e["link"]} for e in entries[:limit]]

def main():
    # Ensure the script writes files to the repository root
    repo_root = os.getenv('GITHUB_WORKSPACE', '.')

    for filename, urls in FEEDS.items():
        output_path = os.path.join(repo_root, filename)
        items = fetch_feed_entries(urls)
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(items, f, ensure_ascii=False, indent=2)
        print(f"Updated {filename} with {len(items)} items.")

if __name__ == "__main__":
    main()
