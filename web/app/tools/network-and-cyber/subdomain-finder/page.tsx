'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from 'lucide-react'
import * as Tooltip from '@radix-ui/react-tooltip'

export default function SubdomainFinder() {
    const [domain, setDomain] = useState('')
    const [subdomains, setSubdomains] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [mode, setMode] = useState<'top200' | 'full'>('top200')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubdomains([]) // Reset previous results
        setLoading(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subdomains?domain=${domain}&mode=${mode}`)
            if (!response.ok) {
                throw new Error('Failed to fetch subdomains')
            }

            const data = await response.json()
            setSubdomains(data.subdomains || [])

            if (data.subdomains.length === 0) {
                toast({
                    title: "No subdomains found",
                    description: "No active subdomains were discovered for this domain. Try another!",
                    variant: "default",
                })
            } else {
                toast({
                    title: "Success",
                    description: `Found ${data.subdomains.length} subdomain${data.subdomains.length === 1 ? '' : 's'}!`,
                    variant: "default",
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong while fetching subdomains. Please try again later!",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="flex-auto py-16 bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8 text-center text-cyan-400">
                    Subdomain Finder
                </h1>
                <p className="text-xl mb-12 text-center text-gray-300">
                    Enter a domain to discover its active subdomains with ease.
                </p>

                <Card className="max-w-lg mx-auto mb-12 bg-black bg-opacity-60 border border-cyan-500 hover:border-cyan-400 transition-all shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-cyan-400">
                            Find Subdomains
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="domain" className="text-gray-200">Domain</Label>
                                <Input
                                    id="domain"
                                    type="text"
                                    placeholder="example.com"
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                    required
                                    className="bg-gray-800 border-cyan-600 text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="mode" className="text-gray-200">Scan Mode</Label>
                                <Select value={mode} onValueChange={(value: 'top200' | 'full') => setMode(value)}>
                                    <SelectTrigger id="mode" className="bg-gray-800 border-cyan-600 text-white">
                                        <SelectValue placeholder="Select scan mode" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 border-cyan-600 text-white">
                                        <SelectItem value="top200">Top 200 Subdomains (Fast)</SelectItem>
                                        <Tooltip.Provider>
                                            <Tooltip.Root>
                                                <Tooltip.Trigger asChild>
                                                    <SelectItem value="full">Full List (Comprehensive)</SelectItem>
                                                </Tooltip.Trigger>
                                                <Tooltip.Portal>
                                                    <Tooltip.Content
                                                        className="bg-gray-700 text-white text-sm p-2 rounded shadow-lg border border-gray-600"
                                                        side="right"
                                                        sideOffset={5}
                                                    >
                                                        This scan may take up to 5 minutes.
                                                        <Tooltip.Arrow className="fill-gray-700" />
                                                    </Tooltip.Content>
                                                </Tooltip.Portal>
                                            </Tooltip.Root>
                                        </Tooltip.Provider>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white transition-colors"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Searching...
                                    </>
                                ) : (
                                    "Find Subdomains"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {subdomains.length > 0 && (
                    <Card className="max-w-lg mx-auto mt-8 bg-gray-900 border border-gray-700 rounded-md shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-cyan-400">
                                Discovered Subdomains ({subdomains.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-white space-y-2 max-h-96 overflow-y-auto">
                                {subdomains.map((sub, index) => (
                                    <li
                                        key={index}
                                        className="bg-gray-800 p-3 rounded-md hover:bg-gray-700 transition-colors"
                                    >
                                        {sub}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                )}
            </div>
        </section>
    )
}