"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const categories = {
  Social: ["Instagram", "TikTok", "X(Twitter)", "Facebook", "Reddit", "Bluesky"],
  Video: ["Youtube", "Twitch", "Vimeo", "Rumble", "Dailymotion"],
  Professional: ["LinkedIn", "Slack", "Fiverr", "GitHub", "GitLab", "Behance", "Trello"],
  Gaming: ["StreamGroup", "Lichess", "Minecraft", "Chess.com", "osu", "Google PlayStore"],
  Blogging: ["Medium", "WordPress", "Hashnode", "Blogger", "Slides"],
  Music: ["Spotify", "SoundCloud", "PromoDJ", "Freesound"],
  Photography: ["Flickr", "Unsplash", "VSCO"],
  Messaging: ["Telegram", "Signal", "Kik"],
  "Software Development": [
    "GitHub",
    "GitLab",
    "npm",
    "PyPi",
    "DockerHub",
    "Replit.com",
    "Leetcode",
    "HackerRank",
    "Codepen",
    "HackerOne",
    "GeeksforGeeks",
    "Kaggle",
    "GitBook",
  ],
};

export default function UsernameSearch() {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState<
    { platform: string; status: string; url: string | null }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Please enter a valid username.");
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await axios.post("http://localhost:5002/username-search", { username });
      setResults(response.data.results);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "An unexpected error occurred.");
      } else if (err instanceof Error) {
        setError(err.message || "An unknown error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const categorizedResults = Object.entries(categories).map(([category, platforms]) => ({
    category,
    platforms: results.filter((result) => platforms.includes(result.platform)),
  }));

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Username Search</h1>
        <div className="max-w-md mx-auto mb-8">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center space-x-2 text-black">
              <Input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </form>
          {error && (
            <div className="bg-red-500 text-white p-4 rounded-lg mt-4">
              {error}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categorizedResults.map(({ category, platforms }) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-purple-500">
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {platforms.length > 0 ? (
                  <ul className="space-y-2">
                    {platforms.map((result, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span className="text-purple-500">{result.platform}</span>
                        {result.status === "exists" ? (
                          <a
                            href={result.url!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-500 hover:underline flex items-center"
                          >
                            Profile Found
                            <ExternalLink className="ml-2 w-4 h-4" />
                          </a>
                        ) : (
                          <span className="text-green-400">Available</span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No results found in this category.</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
