import feedparser
import json

# Define feeds for each category
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
        "https://news.mit.edu/topic/artificial-intelligence2-rss.xml",
        "https://venturebeat.com/category/ai/feed/"
    ],
    "products.json": [
        "https://www.gsmarena.com/rss-news-reviews.php3"
    ],
    "certs.json": [
        # Example – could be replaced with curated feeds for IT courses/certs
        "https://www.classcentral.com/collection/feed/free-certificates"
    ]
}

def fetch_feed(feed_urls, limit=5):
    """Fetch and parse multiple RSS feeds, return top headlines."""
    entries = []
    for url in feed_urls:
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries[:limit]:
                entries.append({
                    "title": entry.title,
                    "link": entry.link
                })
        except Exception as e:
            print(f"Error fetching {url}: {e}")
    # Keep only up to `limit` entries total (not per feed, to avoid overload)
    return entries[:limit]

def main():
    for filename, urls in FEEDS.items():
        headlines = fetch_feed(urls, limit=5)
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(headlines, f, ensure_ascii=False, indent=2)
        print(f"Updated {filename} with {len(headlines)} items.")

if __name__ == "__main__":
    main()

