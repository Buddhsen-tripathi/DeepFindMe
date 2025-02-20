'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

export default function FaceRecognitionSearch() {
    const [email, setEmail] = useState('')
    const tool = 'FaceRecognitionSearch'

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, tool }),
            })
            if (response.ok) {
                toast({
                    title: "You're on the list!",
                    description: "We'll ping you when we're live. Stay tuned!",
                })
                setEmail('')
            } else {
                throw new Error('Failed to submit email')
            }
        } catch (error) {
            toast({
                title: "Oops!",
                description: "Something went wrong. Please try again later.",
                variant: 'destructive',
            })
        }
    }

    return (
        <section className="flex-auto py-16">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8 text-center text-cyan-400 animate-pulse">
                    Face Recognition Search
                </h1>
                <p className="text-xl mb-8 text-center text-gray-300">
                    Use reverse image search to find faces across the web. <br></br>
                    We're leveling up - be the first to know when we drop!
                </p>
                <Card className="max-w-md mx-auto mb-12 bg-black bg-opacity-50 border border-cyan-500 hover:border-cyan-400 transition-all transform hover:scale-105">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-cyan-400">
                            Get Early Access
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                type="email"
                                placeholder="Drop your email here"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-gray-800 border-cyan-600 text-white placeholder-gray-400"
                            />
                            <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                                Notify Me
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                <p className="text-sm text-gray-400 text-center mt-8">
                    <em>Heads up:</em> We're cooking up something epic. Our tool will be faster,
                    more comprehensive, and cooler than ever. Stay in the loop!
                </p>
            </div>
        </section>
    )
}