"use client";

import React, { useState, FormEvent, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Import from next/navigation

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>(""); // State for username
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false); // To check if the component is mounted
  const router = useRouter(); // Use next/navigation router

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isPasswordValid = password.length >= 8;

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate password strength
    if (!isPasswordValid) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    try {
      // Send sign-up request to your backend
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        email,
        username,
        password,
      });

      if (response.status === 201) {
        setSuccess("Account created successfully!");
        if (isClient) {
          router.push("/signup/success");
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignUp = async (provider: "google" | "github") => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin-${provider}`);
      window.location.href = response.data.session.url;
    } catch (error: any) {
      console.error(`${provider} sign-up error:`, error);
      setError(`${provider} sign-up failed`);
    }
  };

  return (
    <div className="flex-grow h-screen bg-gray-900 text-white">
      <main className="pt-4">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <Link href="\">
                <Image
                  src="/logo-white.png"
                  alt="Logo"
                  width={150}
                  height={50}
                  className="mx-auto"
                />
              </Link>
            </div>

            <form
              onSubmit={handleSignUp}
              className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg border border-cyan-500"
            >
              <h1 className="text-2xl font-bold text-center mb-6">Sign up for DeepFind.Me</h1>

              {/* <div className="flex gap-4 justify-center mb-6">
                <button
                  type="button"
                  onClick={() => handleOAuthSignUp("google")}
                  className="flex items-center gap-2 bg-white text-gray-900 font-semibold py-2 px-4 rounded hover:bg-gray-100 transition-all"
                >
                  <FcGoogle className="w-5 h-5" />
                  Sign up with Google
                </button>
                <button
                  type="button"
                  onClick={() => handleOAuthSignUp("github")}
                  className="flex items-center gap-2 bg-gray-700 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition-all"
                >
                  <FaGithub className="w-5 h-5" />
                  Sign up with GitHub
                </button>
              </div>

              <div className="relative text-center mb-6">
                <span className="bg-gray-800 px-2 text-gray-300">OR</span>
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-700"></div>
              </div> */}

              <div className="form-group mb-4">
                <label htmlFor="username" className="block text-gray-300 mb-2">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="form-input w-full px-4 py-2 text-gray-900 border rounded"
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email:
                </label>
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
                <label htmlFor="password" className="block text-gray-300 mb-2">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input w-full px-4 py-2 text-gray-900 border rounded"
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="form-input w-full px-4 py-2 text-gray-900 border rounded"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-500 text-gray-900 font-semibold py-2 px-4 rounded hover:bg-cyan-400 transition-all"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            {error && <p className="error-message text-center text-red-500 mt-4">{error}</p>}
            {success && <p className="success-message text-center text-green-500 mt-4">{success}</p>}

            <p className="text-center text-gray-300 mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-cyan-400 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SignUp;