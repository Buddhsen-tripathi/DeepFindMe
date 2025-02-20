"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function IpToLocation() {
    const [ip, setIp] = useState<string>("");
    const [results, setResults] = useState<Record<string, string | null>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userIp, setUserIp] = useState<string>("");

    // Function to fetch the user's IP address using a public API
    const fetchUserIp = async () => {
        try {
            const response = await axios.get("https://api.ipify.org?format=json");
            setUserIp(response.data.ip);
        } catch (err) {
            setError("Could not fetch IP address.");
        }
    };

    // Automatically fetch the IP address when the component mounts
    useEffect(() => {
        fetchUserIp();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValidIp = (ip: string) => {
            // Regex for basic IP address validation (IPv4)
            const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

            // Regex for IPv6 (optional, depending on your use case)
            const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4})$/;

            return ipv4Pattern.test(ip.trim()) || ipv6Pattern.test(ip.trim());
        };

        if (!ip.trim()) {
            setError("Please enter an IP address.");
            return;
        } else if (!isValidIp(ip)) {
            setError("Please enter a valid IP address.");
            return;
        }
        setLoading(true);
        setError(null);
        setResults({});

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/geolocation/${ip}`);

            // Set the geolocation data to state
            const data = response.data;
            setResults(data);
        } catch (err: unknown) {
            setError("Error fetching geolocation data.");
        } finally {
            setLoading(false);
        }
    };

    // Handle using the fetched IP address
    const handleUseMyIp = () => {
        setIp(userIp); // Set the IP field to the user's IP
    };

    const renderSingleCard = (data: Record<string, string | null>) => {
        return (
            <Card className="bg-black bg-opacity-50 border border-cyan-500 hover:border-cyan-400 transition-colors group hover:bg-cyan-900 hover:bg-opacity-20">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-cyan-400">Geolocation Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-white">
                        {Object.entries(data).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}:</strong> {value || "Not Available"}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        );
    };

    return (
        <section className="py-16 bg-gray-900">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-4 text-center text-white">IP Geolocation Lookup</h1>
                <p className="text-lg mb-8 text-center text-gray-300">
                    Enter an IP address to fetch its geolocation or use your current IP.
                </p>
                <div className="max-w-md mx-auto mb-8">
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="text"
                                placeholder={userIp ? "Enter custom IP or use your IP" : "Enter IP address"}
                                value={ip}
                                onChange={(e) => setIp(e.target.value)}
                                required
                            />
                            <Button type="submit" disabled={loading}>
                                {loading ? "Fetching..." : "Lookup"}
                            </Button>
                        </div>
                    </form>

                    {/* Always show the 'Use My IP' button */}
                    {userIp && (
                        <Button
                            type="button"
                            onClick={handleUseMyIp}
                            className="mt-4"
                        >
                            Use My IP ({userIp})
                        </Button>
                    )}

                    {error && <div className="bg-red-500 text-white p-4 rounded-lg mt-4">{error}</div>}
                </div>
                <div className="grid grid-cols-1 gap-6">
                    {Object.keys(results).length > 0 ? (
                        renderSingleCard(results)
                    ) : (
                        <p className="text-gray-400 text-center">No results to display.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
