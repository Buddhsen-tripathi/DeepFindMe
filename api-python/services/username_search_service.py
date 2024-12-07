from concurrent.futures import ThreadPoolExecutor, as_completed
from sherlock_project.sherlock import sherlock
from sherlock_project.notify import QueryNotifyPrint
from sherlock_project.sites import SitesInformation
from sherlock_project.result import QueryStatus
import os

SUPPORTED_SITES = [
    # Social Media
    "Instagram",
    "Twitter",
    "Facebook",
    "Reddit",
    "Bluesky",
    "Mastodon",
    "VK",
    "Pinterest", 

    # Professional Platforms
    "LinkedIn",
    "Slack",
    "Fiverr",
    "GitHub",
    "GitLab",
    "Behance",
    "Trello",

    # Video Platforms
    "Youtube", 
    "Twitch", 
    "Vimeo", 
    "Rumble", 
    "Dailymotion"

    # Gaming Platforms
    "StreamGroup",
    "Lichess",
    "Minecraft",
    "Chess.com",
    "osu",
    "Google PlayStore",

    # Software Development Platforms
    "GitHub",
    "GitLab",
    "npm",
    "PyPi",
    "DEV Community",
    "Apple Developer",
    "DockerHub",
    "Replit.com",
    "Leetcode",
    "HackerRank",
    "Codepen",
    "HackerOne",
    "GeeksforGeeks",
    "Kaggle",
    "GitBook",

    # Blogging and Creative Platforms
    "Medium", 
    "Hashnode", 
    "Blogger", 
    "Slides"

    # Music and Video Platforms
    "Spotify", 
    "SoundCloud", 
    "PromoDJ", 
    "Freesound"

    # Photography Platforms
    "Unsplash",   # Stock photography sharing
    "Flickr",     # Photography and visual content sharing
    "VSCO",       # Photography and editing

    # Messaging Apps
    "Telegram",   # Messaging and channels
    "Signal",     # Privacy-focused messaging
    "Kik",        # Messaging and social networking
    "Imgur",      # Viral images and hosting
]

def search_usernames(username: str):
    try:
        # Load site data from Sherlock
        site_data_path = os.path.join(os.path.dirname(__file__), "../resources/data.json")
        sites = SitesInformation(site_data_path)
        
        # Filter site data based on SUPPORTED_SITES
        site_data = {
            site.name: site.information
            for site in sites
            if site.name.lower() in [s.lower() for s in SUPPORTED_SITES]
        }

        if not site_data:
            return {"error": "No supported sites found in site data."}

        # Create a QueryNotifyPrint object for output management
        query_notify = QueryNotifyPrint()

        # Parallel execution
        def process_site(site_name, site_info):
            results = sherlock(username, {site_name: site_info}, query_notify)
            return site_name, results

        filtered_results = []
        with ThreadPoolExecutor(max_workers=6) as executor:
            futures = {
                executor.submit(process_site, site, info): site
                for site, info in site_data.items()
            }

            for future in as_completed(futures):
                site_name, results = future.result()

                site_info = results.get(site_name)
                if site_info and site_info["status"].status in (QueryStatus.CLAIMED,QueryStatus.UNKNOWN):
                    filtered_results.append({
                        "platform": site_name,
                        "status": "exists",
                        "url": site_info["url_user"]
                })

        return {"results": filtered_results}

    except Exception as e:
        return {"error": str(e)}