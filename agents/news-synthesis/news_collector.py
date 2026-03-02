"""
News Collection Script for CityPlus
Fetches and parses RSS feeds from local news sources
"""

import feedparser
import json
from datetime import datetime
from typing import List, Dict
import requests


class NewsCollector:
    """Collects news articles from RSS feeds"""
    
    def __init__(self):
        # Sample local news RSS feeds (you can add more)
        self.feeds = [
            "http://rss.cnn.com/rss/cnn_topstories.rss",
            "https://feeds.bbci.co.uk/news/rss.xml",
            # Add your local news sources here
        ]
    
    def fetch_feed(self, feed_url: str) -> List[Dict]:
        """Fetch and parse a single RSS feed"""
        try:
            print(f"Fetching feed: {feed_url}")
            feed = feedparser.parse(feed_url)
            
            articles = []
            for entry in feed.entries:
                article = {
                    "id": entry.get("id", entry.get("link", "")),
                    "title": entry.get("title", ""),
                    "summary": entry.get("summary", entry.get("description", "")),
                    "source": feed.feed.get("title", "Unknown"),
                    "published_at": self._parse_date(entry.get("published", "")),
                    "url": entry.get("link", ""),
                    "category": "local",  # Will be determined by relevance later
                }
                articles.append(article)
            
            print(f"✓ Fetched {len(articles)} articles from {feed.feed.get('title', 'Unknown')}")
            return articles
            
        except Exception as e:
            print(f"✗ Error fetching feed {feed_url}: {str(e)}")
            return []
    
    def _parse_date(self, date_str: str) -> str:
        """Parse date string to ISO8601 format"""
        if not date_str:
            return datetime.now().isoformat()
        
        try:
            # feedparser usually provides a time_struct
            return datetime.now().isoformat()
        except:
            return datetime.now().isoformat()
    
    def collect_all(self) -> List[Dict]:
        """Collect articles from all configured feeds"""
        all_articles = []
        
        print(f"\n📰 Starting news collection from {len(self.feeds)} feeds...\n")
        
        for feed_url in self.feeds:
            articles = self.fetch_feed(feed_url)
            all_articles.extend(articles)
        
        print(f"\n✓ Total articles collected: {len(all_articles)}\n")
        return all_articles
    
    def save_to_file(self, articles: List[Dict], filename: str = "collected_news.json"):
        """Save collected articles to JSON file"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(articles, f, indent=2, ensure_ascii=False)
        print(f"💾 Saved {len(articles)} articles to {filename}")


def main():
    """Main function to run news collection"""
    collector = NewsCollector()
    
    # Collect articles
    articles = collector.collect_all()
    
    # Save to file
    collector.save_to_file(articles)
    
    # Display sample
    if articles:
        print("\n📄 Sample article:")
        print(json.dumps(articles[0], indent=2))


if __name__ == "__main__":
    main()
