"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as dotenv from "dotenv";

dotenv.config()

export default function DomainWHOISLookup() {

    const [domain, setDomain] = useState("");
    const [results, setResults] = useState<Record<string, string | null>>({});
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
        setResults({});

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/whois`, {
                domain,
            });

            // Set the raw WHOIS data to state
            const rawData = response.data.whois_data || {};
            setResults(rawData);
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

    const formatWhoisData = (data: Record<string, string | null>) => {

        const formatDate = (dateString: string | null) => {
            if (!dateString || typeof dateString !== "string") return "Not Available";
        
            const firstDate = dateString.split(/T| /)[0];
        
            const date = new Date(firstDate);
            if (isNaN(date.getTime())) return "Invalid Date";
        
            return date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
          };

        return {
            "Domain Information": {
                "Domain Name": data.domain_name,
                Registrar: data.registrar,
                "Registrar URL": data.registrar_url,
                "Whois Server": data.whois_server,
                "Creation Date": formatDate(data.creation_date),
                "Expiration Date": formatDate(data.expiration_date),
                "Updated Date": formatDate(data.updated_date),
            },
            "Name Servers": Array.isArray(data.name_servers)
                ? data.name_servers.join("\n")
                : data.name_servers || "Not Available",
            "Registrant Information": {
                Organization: data.org,
                Country: data.country,
                State: data.state,
                Address: data.address,
                "Postal Code": data.registrant_postal_code,
            },
            Status: Array.isArray(data.status)
                ? data.status.join("\n")
                : data.status || "Not Available",
            "Abuse Emails": Array.isArray(data.emails)
                ? data.emails.join("\n")
                : data.emails || "Not Available",
            DNSSEC: data.dnssec || "unsigned",
        };
    };

    const renderFormattedResults = (data: Record<string, string | null>) => {
        const formattedResults = formatWhoisData(data);
        return Object.entries(formattedResults).map(([section, content]) => (
            <Card
                key={section}
                className="bg-black bg-opacity-50 border border-cyan-500 hover:border-cyan-400 transition-colors group hover:bg-cyan-900 hover:bg-opacity-20"
            >
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-cyan-400">{section}</CardTitle>
                </CardHeader>
                <CardContent>
                    {typeof content === "string" ? (
                        <p className="text-white whitespace-pre-line">{content}</p>
                    ) : (
                        <ul className="space-y-2">
                            {Object.entries(content as Record<string, string>).map(([key, value]) => (
                                <li key={key} className="text-white">
                                    <strong>{key}:</strong> {value || "Not Available"}
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>
        ));
    };

    return (
        <section className="py-16 bg-gray-900">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-4 text-center text-white">Domain WHOIS Lookup</h1>
                <p className="text-lg mb-8 text-center text-gray-300">
                    Enter a domain name to fetch its WHOIS records and details.
                </p>
                <div className="max-w-md mx-auto mb-8">
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="text"
                                placeholder="Enter domain name"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                required
                            />
                            <Button type="submit" disabled={loading}>
                                {loading ? "Fetching..." : "Lookup"}
                            </Button>
                        </div>
                    </form>
                    {error && <div className="bg-red-500 text-white p-4 rounded-lg mt-4">{error}</div>}
                </div>
                <div className="grid grid-cols-1 gap-6">
                    {Object.keys(results).length > 0 ? (
                        renderFormattedResults(results)
                    ) : (
                        <p className="text-gray-400 text-center">No results to display.</p>
                    )}
                </div>
            </div>
        </section>
    );
}