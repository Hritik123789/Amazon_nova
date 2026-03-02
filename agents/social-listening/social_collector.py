"""
Social Media Collection Script for CityPlus
Mock implementation for testing data structure
(Will be replaced with real scraping using Nova Act + sentiment analysis with Nova 2 Lite)
"""

import json
import random
from datetime import datetime, timedelta
from typing import List, Dict


class SocialCollector:
    """Collects social media posts (mock implementation for now)"""
    
    # Sample sources
    SOURCES = ["reddit", "facebook", "nextdoor", "twitter"]
    
    # Sample sentiments
    SENTIMENTS = ["positive", "neutral", "negative"]
    
    # Sample topics
    TOPICS = [
        "traffic", "construction", "parking", "safety", "events",
        "restaurants", "noise", "crime", "schools", "parks"
    ]
    
    # Sample post templates
    POST_TEMPLATES = {
        "traffic": [
            "Major traffic jam on {street} due to construction",
            "Avoid {street} this morning, completely backed up",
            "Anyone know why traffic is so bad on {street}?",
        ],
        "construction": [
            "Construction noise on {street} starting at 7am again",
            "New building going up on {street}, looks interesting",
            "How long is this construction on {street} going to last?",
        ],
        "parking": [
            "Impossible to find parking near {street} anymore",
            "New parking restrictions on {street} are ridiculous",
            "PSA: Free parking on {street} after 6pm",
        ],
        "restaurants": [
            "New restaurant opening on {street} next week!",
            "That place on {street} has amazing food",
            "Restaurant on {street} closed down, so sad",
        ],
        "safety": [
            "Saw a break-in on {street} last night, be careful",
            "Police activity on {street} this morning",
            "Neighborhood watch meeting about {street} safety",
        ],
    }
    
    STREETS = ["Market St", "Mission St", "Valencia St", "Haight St", "Castro St"]
    
    def __init__(self):
        """Initialize social collector"""
        pass
    
    def generate_mock_posts(self, count: int = 50) -> List[Dict]:
        """Generate mock social media posts"""
        posts = []
        
        print(f"\n💬 Generating {count} mock social posts...\n")
        
        for i in range(count):
            # Random timestamp in past 7 days
            hours_ago = random.randint(1, 168)  # 7 days
            posted_at = (datetime.now() - timedelta(hours=hours_ago)).isoformat()
            
            # Pick random topic and source
            topic = random.choice(self.TOPICS)
            source = random.choice(self.SOURCES)
            
            # Generate content
            if topic in self.POST_TEMPLATES:
                template = random.choice(self.POST_TEMPLATES[topic])
                content = template.format(street=random.choice(self.STREETS))
            else:
                content = f"Discussion about {topic} in the neighborhood"
            
            # Determine sentiment based on topic
            if topic in ["restaurants", "events", "parks"]:
                sentiment = random.choice(["positive", "positive", "neutral"])
            elif topic in ["traffic", "construction", "crime", "noise"]:
                sentiment = random.choice(["negative", "negative", "neutral"])
            else:
                sentiment = random.choice(self.SENTIMENTS)
            
            post = {
                "id": f"post-{20000 + i}",
                "source": source,
                "author": f"user{random.randint(100, 999)}",
                "content": content,
                "sentiment": sentiment,
                "topics": [topic] + random.sample([t for t in self.TOPICS if t != topic], k=random.randint(0, 2)),
                "posted_at": posted_at,
                "engagement": {
                    "likes": random.randint(0, 100),
                    "comments": random.randint(0, 50),
                    "shares": random.randint(0, 20)
                },
                "location_mentioned": random.choice(self.STREETS) if random.random() > 0.3 else None,
            }
            
            posts.append(post)
        
        print(f"✓ Generated {len(posts)} mock posts\n")
        return posts
    
    def analyze_sentiment(self, posts: List[Dict]) -> Dict:
        """Analyze overall sentiment"""
        sentiment_counts = {"positive": 0, "neutral": 0, "negative": 0}
        
        for post in posts:
            sentiment_counts[post["sentiment"]] += 1
        
        total = len(posts)
        sentiment_summary = {
            "positive": round(sentiment_counts["positive"] / total, 2),
            "neutral": round(sentiment_counts["neutral"] / total, 2),
            "negative": round(sentiment_counts["negative"] / total, 2),
        }
        
        return sentiment_summary
    
    def get_trending_topics(self, posts: List[Dict], top_n: int = 5) -> List[str]:
        """Get trending topics from posts"""
        topic_counts = {}
        
        for post in posts:
            for topic in post["topics"]:
                topic_counts[topic] = topic_counts.get(topic, 0) + 1
        
        # Sort by count
        sorted_topics = sorted(topic_counts.items(), key=lambda x: x[1], reverse=True)
        return [topic for topic, count in sorted_topics[:top_n]]
    
    def save_to_file(self, posts: List[Dict], filename: str = "collected_social.json"):
        """Save collected posts to JSON file"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(posts, f, indent=2, ensure_ascii=False)
        print(f"💾 Saved {len(posts)} posts to {filename}")


def main():
    """Main function to run social collection"""
    collector = SocialCollector()
    
    # Generate mock posts
    posts = collector.generate_mock_posts(count=50)
    
    # Analyze sentiment
    sentiment = collector.analyze_sentiment(posts)
    
    # Get trending topics
    trending = collector.get_trending_topics(posts, top_n=5)
    
    # Save to file
    collector.save_to_file(posts)
    
    # Display sample
    if posts:
        print("\n📄 Sample post:")
        print(json.dumps(posts[0], indent=2))
        
        # Show statistics
        print(f"\n📊 Statistics:")
        print(f"   Total posts: {len(posts)}")
        print(f"\n   Sentiment breakdown:")
        print(f"   Positive: {sentiment['positive']*100:.0f}%")
        print(f"   Neutral: {sentiment['neutral']*100:.0f}%")
        print(f"   Negative: {sentiment['negative']*100:.0f}%")
        print(f"\n   Trending topics: {', '.join(trending)}")


if __name__ == "__main__":
    main()
