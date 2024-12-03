'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

export default function OrganizationContactPage() {
    const [formData, setFormData] = useState({
        organizationName: '',
        contactName: '',
        email: '',
        message: '',
    });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData);
        // After successful submission, redirect to a thank you page
        router.push('/contribute/thank-you');
    };

    return (
        <main className='flex flex-col h-screen'>
            <NavBar />
            <div className="flex-grow bg-gray-900 text-white py-24">
                <div className="container mx-auto px-4 max-w-md">
                    <h1 className="text-4xl font-bold mb-8 text-center">Organization Contact</h1>
                    <p className="text-xl mb-8 text-center text-gray-300">
                        Interested in collaborating with us? Fill out the form below and we'll get back to you soon.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="organizationName" className="block text-sm font-medium text-gray-300 mb-2">
                                Organization Name
                            </label>
                            <input
                                type="text"
                                id="organizationName"
                                name="organizationName"
                                value={formData.organizationName}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="contactName" className="block text-sm font-medium text-gray-300 mb-2">
                                Contact Name
                            </label>
                            <input
                                type="text"
                                id="contactName"
                                name="contactName"
                                value={formData.contactName}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-cyan-500 text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-cyan-400 transition duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    );
}