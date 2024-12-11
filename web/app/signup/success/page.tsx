// pages/signup-success.tsx
import React from "react";
import Link from "next/link";

const SignUpSuccess: React.FC = () => {
  return (
    <div className="flex-grow h-screen bg-gray-900 text-white flex justify-center items-center">
      <div className="text-center p-6 bg-gray-800 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Sign-Up Successful!</h1>
        <p className="text-gray-300 mb-4">
          Please verify your email to log in.
        </p>
        <Link href="/login">
          <button className="bg-cyan-500 text-gray-900 font-semibold py-2 px-4 rounded hover:bg-cyan-400 transition-all">
            Go to Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SignUpSuccess;