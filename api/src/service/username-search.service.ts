import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class UsernameSearchService {
  private readonly axiosInstance: AxiosInstance;

  private readonly platforms = {
    Instagram: 'https://instagram.com/{username}',
    // Twitter: 'https://twitter.com/{username}',
    Facebook: 'https://www.facebook.com/{username}',
    Reddit: 'https://www.reddit.com/user/{username}',
    Bluesky: 'https://bsky.app/profile/{username}',
    Mastodon: 'https://mastodon.social/@{username}',
    VK: 'https://vk.com/{username}',
    Pinterest: 'https://pinterest.com/{username}',
    YouTube: 'https://www.youtube.com/@{username}',
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
    // 'Chess.com': 'https://www.chess.com/member/{username}',
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
    Imgur: 'https://imgur.com/user/{username}',
    npm: 'https://www.npmjs.com/~{username}',
    PyPi: 'https://pypi.org/user/{username}',
    'DEV Community': 'https://dev.to/{username}',
    'Apple Developer': 'https://developer.apple.com/{username}',
    DockerHub: 'https://hub.docker.com/u/{username}',
    'Replit.com': 'https://replit.com/@{username}',
    // Leetcode: 'https://leetcode.com/{username}',
    HackerRank: 'https://www.hackerrank.com/{username}',
    Codepen: 'https://codepen.io/{username}',
    HackerOne: 'https://hackerone.com/{username}',
    GeeksforGeeks: 'https://auth.geeksforgeeks.org/user/{username}/profile',
    Kaggle: 'https://www.kaggle.com/{username}',
    GitBook: 'https://{username}.gitbook.io',
  };

  constructor() {
    this.axiosInstance = axios.create({
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    });
  }

  private formatUrl(platform: string, username: string): string {
    return platform.replace('{username}', encodeURIComponent(username));
  }

  private async fetchUrl(url: string): Promise<boolean> {
    try {
      const response = await this.axiosInstance.head(url);
      return response.status === 200;
    } catch {
      return false;
    }
  }

  async searchUsername(username: string): Promise<any> {
    if (!username || username.trim() === '') {
      throw new Error('Username cannot be empty');
    }

    const tasks = Object.entries(this.platforms).map(async ([platform, urlTemplate]) => {
      const url = this.formatUrl(urlTemplate, username);
      const exists = await this.fetchUrl(url);
      return { platform, status: exists ? 'exists' : 'available', url: exists ? url : null };
    });

    const results = await Promise.all(tasks);
    return { username, results };
  }
}