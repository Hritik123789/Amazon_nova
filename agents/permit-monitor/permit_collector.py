"""
Permit Collection Script for CityPlus
Mock implementation for testing data structure
(Will be replaced with real scraping using Nova Act)
"""

import json
import random
from datetime import datetime, timedelta
from typing import List, Dict


class PermitCollector:
    """Collects permit data (mock implementation for now)"""
    
    # Sample permit types
    PERMIT_TYPES = ["building", "liquor", "zoning", "demolition"]
    
    # Sample statuses
    STATUSES = ["pending", "approved", "rejected", "completed"]
    
    # Sample addresses in San Francisco
    SAMPLE_ADDRESSES = [
        "123 Market St, San Francisco, CA",
        "456 Mission St, San Francisco, CA",
        "789 Valencia St, San Francisco, CA",
        "321 Haight St, San Francisco, CA",
        "654 Castro St, San Francisco, CA",
        "987 Divisadero St, San Francisco, CA",
        "147 Polk St, San Francisco, CA",
        "258 Geary St, San Francisco, CA",
    ]
    
    def __init__(self, center_lat: float = 37.7749, center_lng: float = -122.4194):
        """Initialize with center coordinates (default: San Francisco)"""
        self.center_lat = center_lat
        self.center_lng = center_lng
    
    def generate_mock_permits(self, count: int = 20) -> List[Dict]:
        """Generate mock permit data for testing"""
        permits = []
        
        print(f"\n🏗️  Generating {count} mock permits...\n")
        
        for i in range(count):
            # Random coordinates near center
            lat = self.center_lat + random.uniform(-0.05, 0.05)
            lng = self.center_lng + random.uniform(-0.05, 0.05)
            
            # Calculate mock distance
            distance = random.uniform(0.1, 3.0)
            
            # Random date in past 90 days
            days_ago = random.randint(1, 90)
            filed_date = (datetime.now() - timedelta(days=days_ago)).isoformat()
            
            permit_type = random.choice(self.PERMIT_TYPES)
            
            permit = {
                "id": f"permit-{10000 + i}",
                "type": permit_type,
                "address": random.choice(self.SAMPLE_ADDRESSES),
                "description": self._generate_description(permit_type),
                "filed_date": filed_date,
                "status": random.choice(self.STATUSES),
                "coordinates": {
                    "lat": round(lat, 6),
                    "lng": round(lng, 6)
                },
                "distance_miles": round(distance, 2),
                "applicant": f"Company {chr(65 + i % 26)}",
                "estimated_cost": random.randint(10000, 500000) if random.random() > 0.3 else None,
            }
            
            permits.append(permit)
        
        print(f"✓ Generated {len(permits)} mock permits\n")
        return permits
    
    def _generate_description(self, permit_type: str) -> str:
        """Generate description based on permit type"""
        descriptions = {
            "building": [
                "New restaurant construction",
                "Office building renovation",
                "Residential addition",
                "Commercial storefront remodel",
            ],
            "liquor": [
                "New bar liquor license",
                "Restaurant beer and wine license",
                "Liquor license transfer",
            ],
            "zoning": [
                "Variance for building height",
                "Change of use from retail to restaurant",
                "Conditional use permit",
            ],
            "demolition": [
                "Demolish existing structure",
                "Partial demolition for renovation",
            ]
        }
        return random.choice(descriptions.get(permit_type, ["General permit"]))
    
    def filter_by_radius(self, permits: List[Dict], radius_miles: float) -> List[Dict]:
        """Filter permits within specified radius"""
        filtered = [p for p in permits if p["distance_miles"] <= radius_miles]
        print(f"📍 Filtered to {len(filtered)} permits within {radius_miles} miles")
        return filtered
    
    def save_to_file(self, permits: List[Dict], filename: str = "collected_permits.json"):
        """Save collected permits to JSON file"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(permits, f, indent=2, ensure_ascii=False)
        print(f"💾 Saved {len(permits)} permits to {filename}")


def main():
    """Main function to run permit collection"""
    # Initialize collector (San Francisco coordinates)
    collector = PermitCollector(center_lat=37.7749, center_lng=-122.4194)
    
    # Generate mock permits
    permits = collector.generate_mock_permits(count=30)
    
    # Filter to within 2 miles
    nearby_permits = collector.filter_by_radius(permits, radius_miles=2.0)
    
    # Save to file
    collector.save_to_file(nearby_permits)
    
    # Display sample
    if nearby_permits:
        print("\n📄 Sample permit:")
        print(json.dumps(nearby_permits[0], indent=2))
        
        # Show statistics
        print(f"\n📊 Statistics:")
        print(f"   Total permits: {len(nearby_permits)}")
        types = {}
        for p in nearby_permits:
            types[p['type']] = types.get(p['type'], 0) + 1
        for ptype, count in types.items():
            print(f"   {ptype}: {count}")


if __name__ == "__main__":
    main()
