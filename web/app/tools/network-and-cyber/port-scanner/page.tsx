"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PortScanner() {
  const [ipOrDomain, setIpOrDomain] = useState("");
  const [portRange, setPortRange] = useState("1-65535");
  const [results, setResults] = useState<
    { port: number; status: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ipOrDomain.trim()) {
      setError("Please enter a valid IP address or domain.");
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/port-scan`,
        { ipOrDomain, portRange }
      );
      setResults(response.data.results);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "An unexpected error occurred."
        );
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-center text-white">
          Port Scanner
        </h1>
        <p className="text-lg mb-8 text-center text-gray-300">
          Enter an IP address or domain and a port range to scan for open ports.
        </p>
        <div className="max-w-md mx-auto mb-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <Input
                type="text"
                placeholder="Enter IP or Domain"
                value={ipOrDomain}
                onChange={(e) => setIpOrDomain(e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Enter port range (e.g., 20-80)"
                value={portRange}
                onChange={(e) => setPortRange(e.target.value)}
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Scanning..." : "Scan"}
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
                Scan Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.map(({ port, status }, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="text-white">Port {port}</span>
                    <span
                      className={
                        status === "open"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {status.toUpperCase()}
                    </span>
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
