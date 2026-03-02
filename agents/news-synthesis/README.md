# News Synthesis Agent - Data Collection

This directory contains the news collection and synthesis components for CityPlus.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

### Collect News Articles

Run the news collector to fetch articles from RSS feeds:

```bash
python news_collector.py
```

This will:
- Fetch articles from configured RSS feeds
- Parse and structure the data
- Save results to `collected_news.json`
- Display a sample article

### Adding Your Local News Sources

Edit `news_collector.py` and add your local news RSS feeds to the `self.feeds` list:

```python
self.feeds = [
    "https://your-local-news.com/rss",
    "https://city-newspaper.com/feed",
]
```

## Output Format

Articles are saved in JSON format matching the schema in `/shared/schemas/news-article.json`:

```json
{
  "id": "article-id",
  "title": "Article Title",
  "summary": "Article summary or description",
  "source": "News Source Name",
  "published_at": "2024-02-27T10:00:00",
  "url": "https://...",
  "category": "local"
}
```

## Next Steps

- Add relevance scoring based on location
- Integrate with Amazon Bedrock Nova 2 Lite for summarization
- Deploy as AWS Lambda function
