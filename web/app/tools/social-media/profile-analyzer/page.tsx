"use client"

import { useState } from 'react'
import { Search, User, Calendar, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ProfileData {
  username: string
  name: string
  bio: string
  joinDate: string
  location: string
  followers: number
  following: number
}

export default function ProfileAnalyzer() {
  const [profileUrl, setProfileUrl] = useState('')
  const [profileData, setProfileData] = useState<ProfileData | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This is where you'd typically make an API call to perform the actual analysis
    // For demonstration, we'll just set some dummy data
    setProfileData({
      username: 'johndoe',
      name: 'John Doe',
      bio: 'Passionate about technology and innovation',
      joinDate: 'January 2015',
      location: 'San Francisco, CA',
      followers: 5000,
      following: 1000,
    })
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Profile Analyzer</h1>
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex items-center space-x-2 text-gray-950">
              <Input
                type="url"
                placeholder="Enter profile URL"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                required
              />
              <Button type="submit">Analyze</Button>
            </div>
          </form>
          {profileData && (
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Search className="w-6 h-6 mr-2 text-cyan-400" />
                Profile Analysis
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-cyan-400" />
                  <span>{profileData.name} (@{profileData.username})</span>
                </div>
                <p>{profileData.bio}</p>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-cyan-400" />
                  <span>Joined: {profileData.joinDate}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-cyan-400" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex space-x-4">
                  <span>Followers: {profileData.followers}</span>
                  <span>Following: {profileData.following}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}