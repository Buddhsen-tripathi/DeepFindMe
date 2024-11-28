import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class UsernameSearchService {
  private readonly axiosInstance: AxiosInstance;

  // Platforms list with LinkedIn using search engine method
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
    'Google PlayStore':
      'https://play.google.com/store/apps/developer?id={username}',
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
    Replit: 'https://replit.com/@{username}',
    HackerRank: 'https://www.hackerrank.com/{username}',
    Codepen: 'https://codepen.io/{username}',
    HackerOne: 'https://hackerone.com/{username}',
    GeeksforGeeks: 'https://auth.geeksforgeeks.org/user/{username}/profile',
    Kaggle: 'https://www.kaggle.com/{username}',
    GitBook: 'https://{username}.gitbook.io',
  };

  constructor() {
    // Initialize Axios instance with enhanced configuration
    this.axiosInstance = axios.create({
      timeout: 5000, // 5 seconds timeout
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });
  }

  // Helper function to format URLs
  private formatUrl(platform: string, username: string): string | null {
    if (platform === 'LinkedIn') {
      return `https://www.google.com/search?q=site:linkedin.com/in+${encodeURIComponent(
        username,
      )}`;
    }

    const template = this.platforms[platform];
    return template.replace('{username}', encodeURIComponent(username));
  }

  // Method to search for a username
  async searchUsername(username: string) {
    if (!username || username.trim() === '') {
      throw new Error('Username cannot be empty');
    }

    const requests = Object.entries(this.platforms).map(
      async ([platform, _urlTemplate]) => {
        const url = this.formatUrl(platform, username);

        if (platform === 'LinkedIn') {
          // Special handling for LinkedIn via search engine
          try {
            const response = await this.axiosInstance.get(url);
            const exists = response.data.includes('linkedin.com/in/');

            return {
              platform,
              status: exists ? 'exists' : 'available',
              url: exists ? `https://linkedin.com/in/${username}` : null,
            };
          } catch (error) {
            return {
              platform,
              status: 'error',
              url: null,
              error: error.message,
            };
          }
        }

        // Default platform handling
        try {
          const response = await this.axiosInstance.head(url);
          return {
            platform,
            status: response.status === 200 ? 'exists' : 'available',
            url: response.status === 200 ? url : null,
          };
        } catch (error) {
          return {
            platform,
            status: 'error',
            url: null,
            error: error.message,
          };
        }
      },
    );

    const results = await Promise.allSettled(requests);

    const processedResults = results
      .filter((result) => result.status === 'fulfilled')
      .map((result) => (result as PromiseFulfilledResult<any>).value);

    return {
      username,
      results: processedResults,
    };
  }
}
