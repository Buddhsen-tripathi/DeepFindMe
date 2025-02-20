"use client";

import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import * as dotenv from "dotenv";

dotenv.config();

interface SignInResponse {
  message: string;
  session: {
    id: string;
    email: string;
    [key: string]: any;
  };
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post<SignInResponse>(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, { email, password });
      setSuccess(response.data.message);

      // Save login state (e.g., to localStorage or a global state like context)
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user_uuid',response.data.session.id)
      router.push('/login/success');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin-google`);
      window.location.href = response.data.session.url;
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      setError('Google sign-in failed');
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin-github`);
      window.location.href = response.data.url;
    } catch (error: any) {
      console.error('GitHub sign-in error:', error);
      setError('GitHub sign-in failed');
    }
  };

  return (
    <div className="flex-grow h-screen bg-gray-900 text-white">
      <main className="pt-4">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <Link href="/">
              <Image
                src="/logo-white.png"
                alt="Logo"
                width={150}
                height={50}
                className="mx-auto"
              />
              </Link>
            </div>

            <form onSubmit={handleSignIn} className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg border border-cyan-500">
              <h1 className="text-2xl font-bold text-center mb-6">Sign in to DeepFind.Me</h1>

              <div className="flex gap-4 justify-center mb-6">
                <button type="button" onClick={handleGoogleSignIn} className="flex items-center gap-2 bg-white text-gray-900 font-semibold py-2 px-4 rounded hover:bg-gray-100 transition-all">
                  <FcGoogle className="w-5 h-5" />
                  Sign in with Google
                </button>
                <button type="button" onClick={handleGithubSignIn} className="flex items-center gap-2 bg-gray-700 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition-all">
                  <FaGithub className="w-5 h-5" />
                  Sign in with GitHub
                </button>
              </div>

              <div className="relative text-center mb-6">
                <span className="bg-gray-800 px-2 text-gray-300">OR</span>
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-700"></div>
              </div>

              <div className="form-group mb-4">
                <label htmlFor="email" className="block text-gray-300 mb-2">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input w-full px-4 py-2 text-gray-900 border rounded"
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password" className="block text-gray-300 mb-2">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input w-full px-4 py-2 text-gray-900 border rounded"
                />
              </div>
              <button type="submit" className="w-full bg-cyan-500 text-gray-900 font-semibold py-2 px-4 rounded hover:bg-cyan-400 transition-all">
                Sign In
              </button>
            </form>

            {error && <p className="error-message text-center text-red-500 mt-4">{error}</p>}
            {success && <p className="success-message text-center text-green-500 mt-4">{success}</p>}

            <p className="text-center text-gray-300 mt-4">
              Don&apos;t have an account? <Link href="/signup" className="text-cyan-400 hover:underline">Sign Up</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;
