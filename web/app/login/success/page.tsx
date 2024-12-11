"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('isLoggedIn', 'true'); // Store login state in localStorage

    // Automatically redirect to the homepage after 3 seconds
    const timer = setTimeout(() => {
      router.push("/"); // Redirect to homepage
    }, 3000);

    // Clean up the timeout
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex-grow h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Login Successful!</h1>
        <p className="text-lg mb-4">Redirecting to the homepage...</p>
        <p className="text-sm text-gray-400">You will be redirected shortly...</p>
      </div>
    </div>
  );
};

export default SuccessPage;