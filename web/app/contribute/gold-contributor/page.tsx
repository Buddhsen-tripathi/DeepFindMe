'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function GoldContributorPage() {
    const [amount, setAmount] = useState(5);
    const router = useRouter();

    const handleDonate = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically integrate with a payment processor
        console.log('Processing donation of $', amount);
        // After successful donation, redirect to a thank you page
        router.push('/contribute/thank-you');
    };

    return (
        <main className='flex flex-col h-screen'>
            <NavBar/>
            <div className="flex-grow bg-gray-900 text-white py-24">
                <div className="container mx-auto px-4 max-w-md">
                    <h1 className="text-4xl font-bold mb-8 text-center">Gold Contributor</h1>
                    <p className="text-xl mb-8 text-center text-gray-300">
                        Thank you for choosing to become a Gold Contributor! Your support helps us grow and improve our platform.
                    </p>
                    <form onSubmit={handleDonate} className="space-y-6">
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
                                Donation Amount (up to $5)
                            </label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                max="5"
                                min="2"
                                value={amount}
                                onChange={(e) => setAmount(Math.min(Number(e.target.value), 5))}
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-cyan-500 text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-cyan-400 transition duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Donate Now
                        </button>
                    </form>
                </div>
            </div>
            <Footer/>
        </main>
    );
}

