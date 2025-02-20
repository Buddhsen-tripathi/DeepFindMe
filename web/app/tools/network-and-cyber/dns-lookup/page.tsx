'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from 'axios'


export default function DnsLookup() {
    const [domain, setDomain] = useState("");
    const [results, setResults] = useState<
        { recordType: string; value: string }[]
    >([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!domain.trim()) {
            setError("Please enter a valid domain.");
            return;
        }

        setLoading(true);
        setError(null);
        setResults([]);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/dns-lookup`,
                { domain }
            );
            setResults(response.data.records);
        } catch (err: unknown) {
            setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-16 bg-gray-900">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-4 text-center text-white">
                    DNS Lookup
                </h1>
                <p className="text-lg mb-8 text-center text-gray-300">
                    Enter a domain name to fetch DNS records (A, MX, TXT, etc.)
                </p>
                <div className="max-w-md mx-auto mb-8">
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="text"
                                placeholder="Enter domain"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                required
                            />
                            <Button type="submit" disabled={loading}>
                                {loading ? "Looking up..." : "Lookup"}
                            </Button>
                        </div>
                    </form>
                    {error && (
                        <div className="bg-red-500 text-white p-4 rounded-lg mt-4">
                            {error}
                        </div>
                    )}
                </div>
                {results.length > 0 && (
                    <Card className="bg-black bg-opacity-50 border border-cyan-500">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-cyan-400">
                                DNS Records
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {results.map(({ recordType, value }, index) => (
                                    <li key={index} className="flex justify-between items-center">
                                        <span className="text-white">{recordType}</span>
                                        <span className="text-gray-300">{value}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                )}
            </div>
        </section>
    );
}
