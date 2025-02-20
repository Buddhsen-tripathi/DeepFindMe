'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const SuccessPage: React.FC = () => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Not signed in. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome, {user?.firstName || 'User'}!</h1>
        <p className="text-gray-300 mt-2">Login successful!</p>
        <button
          onClick={handleGoHome}
          className="mt-4 px-4 py-2 bg-cyan-500 text-gray-900 font-semibold rounded hover:bg-cyan-400 transition-all"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;