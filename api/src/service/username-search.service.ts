import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class UsernameSearchService {
  private readonly axiosInstance: AxiosInstance;

  // List of platforms with URL templates
  private readonly platforms = {
    Instagram: 'https://instagram.com/{username}',
    TikTok: 'https://www.tiktok.com/@{username}',
    Facebook: 'https://www.facebook.com/{username}',
    Reddit: 'https://www.reddit.com/user/{username}',
    Bluesky: 'https://bsky.app/profile/{username}',
    Youtube: 'https://www.youtube.com/@{username}',
    Twitch: 'https://www.twitch.tv/{username}',
    Vimeo: 'https://vimeo.com/{username}',
    Rumble: 'https://rumble.com/user/{username}',
    Dailymotion: 'https://www.dailymotion.com/{username}',
    LinkedIn: 'https://www.linkedin.com/in/{username}',
    Slack: 'https://{username}.slack.com',
    Fiverr: 'https://www.fiverr.com/{username}',
    GitHub: 'https://github.com/{username}',
    GitLab: 'https://gitlab.com/{username}',
    Behance: 'https://www.behance.net/{username}',
    Trello: 'https://trello.com/{username}',
    StreamGroup: 'https://streamgroup.com/{username}',
    Lichess: 'https://lichess.org/@/{username}',
    Minecraft: 'https://minecraft.net/profile/{username}',
    osu: 'https://osu.ppy.sh/u/{username}',
    'Google PlayStore': 'https://play.google.com/store/apps/developer?id={username}',
    Medium: 'https://medium.com/@{username}',
    Hashnode: 'https://hashnode.com/@{username}',
    Blogger: 'https://{username}.blogspot.com',
    Slides: 'https://slides.com/{username}',
    Spotify: 'https://open.spotify.com/user/{username}',
    SoundCloud: 'https://soundcloud.com/{username}',
    PromoDJ: 'https://promodj.com/{username}',
    Freesound: 'https://freesound.org/people/{username}',
    Flickr: 'https://www.flickr.com/photos/{username}',
    Unsplash: 'https://unsplash.com/@{username}',
    VSCO: 'https://vsco.co/{username}/gallery',
    Telegram: 'https://t.me/{username}',
    Signal: 'https://signal.me/#p/{username}',
    Kik: 'https://kik.me/{username}',
    npm: 'https://www.npmjs.com/~{username}',
    PyPi: 'https://pypi.org/user/{username}',
    DockerHub: 'https://hub.docker.com/u/{username}',
    Replit : 'https://replit.com/@{username}',
    Leetcode: 'https://leetcode.com/u/{username}',
    HackerRank: 'https://www.hackerrank.com/{username}',
    Codepen: 'https://codepen.io/{username}',
    HackerOne: 'https://hackerone.com/{username}',
    GeeksforGeeks: 'https://auth.geeksforgeeks.org/user/{username}/profile',
    Kaggle: 'https://www.kaggle.com/{username}',
    GitBook: 'https://{username}.gitbook.io',
  };

  constructor() {
    // Initialize Axios instance with default configurations
    this.axiosInstance = axios.create({
      timeout: 5000, // Set a timeout of 5 seconds
      validateStatus: (status) => status < 500, // Only reject if server error
    });
  }

  private formatUrl(platformUrl: string, username: string): string {
    return platformUrl.replace('{username}', username);
  }

  async searchUsername(username: string) {
    const requests = Object.entries(this.platforms).map(async ([platform, urlTemplate]) => {
      const url = this.formatUrl(urlTemplate, username);

      try {
        const response = await this.axiosInstance.head(url);
        return response.status === 200
          ? { platform, status: 'exists', url }
          : { platform, status: 'available', url: null };
      } catch {
        return { platform, status: 'available', url: null };
      }
    });

    const results = await Promise.all(requests);

    return { username, results };
  }
}
