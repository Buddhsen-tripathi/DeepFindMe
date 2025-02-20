'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const OAuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      // Check the session by processing the URL fragment
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        // Log the error and redirect to login if session check fails
        console.error('No session found:', error?.message);
        router.push('/login');
      } else {
        // Store user data in localStorage (optional)
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user_uuid', session.user.id);
        // Redirect to success page
        router.push('/login/success');
      }
    };

    checkSession();
  }, [router]);

  // Display a loading state while the session is being checked
  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
};

export default OAuthCallback;