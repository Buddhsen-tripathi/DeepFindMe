import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UsernameLookupService {
  // List of platforms with URL templates
  private platforms = {
    Instagram: 'https://instagram.com/{username}',
    TikTok: 'https://www.tiktok.com/@{username}',
    Twitter: 'https://x.com/{username}',
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
    'Chess.com': 'https://www.chess.com/member/{username}',
    osu: 'https://osu.ppy.sh/u/{username}',
    'Google PlayStore': 'https://play.google.com/store/apps/developer?id={username}',
    Medium: 'https://medium.com/@{username}',
    WordPress: 'https://{username}.wordpress.com',
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
    'Replit.com': 'https://replit.com/@{username}',
    Leetcode: 'https://leetcode.com/{username}',
    HackerRank: 'https://www.hackerrank.com/{username}',
    Codepen: 'https://codepen.io/{username}',
    HackerOne: 'https://hackerone.com/{username}',
    GeeksforGeeks: 'https://auth.geeksforgeeks.org/user/{username}/profile',
    Kaggle: 'https://www.kaggle.com/{username}',
    GitBook: 'https://{username}.gitbook.io',
  };

  async lookupUsername(username: string) {
    const results = [];

    for (const platform in this.platforms) {
      const urlTemplate = this.platforms[platform];
      const url = urlTemplate.replace('{username}', username);

      try {
        const response = await axios.head(url);
        if (response.status === 200) {
          results.push({ platform, status: 'exists', url });
        }
      } catch (error) {
        results.push({ platform, status: 'available', url: null });
      }
    }

    return { username, results };
  }
}