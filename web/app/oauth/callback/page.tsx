'use client'

import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';  // Import useSearchParams

const OAuthCallback = () => {
    const router = useRouter();
    const searchParams = useSearchParams();  // Use searchParams instead of query

    useEffect(() => {
        const access_token = searchParams.get('access_token');
        const user = searchParams.get('user');  // You may need to parse 'user' if it's an object
        const error = searchParams.get('error');
        const refresh_token = searchParams.get('refresh_token');
        const provider_token = searchParams.get('provider_token');
        const expires_at = searchParams.get('expires_at');

        if (error) {
            // Handle error, maybe show an error page
            console.error("OAuth error:", error);
            router.push('/login');
            return;
        }

        if (access_token && user) {
            // Parse user if it's a stringified JSON object
            let parsedUser = null;
            try {
                parsedUser = user ? JSON.parse(user) : null;
            } catch (e) {
                console.error("Failed to parse user data", e);
                router.push('/login');
                return;
            }

            // Store access token and user data (you can also use sessionStorage or localStorage)
            Cookies.set('access_token', access_token, { expires: 7 });  // Store in cookies (consider HttpOnly)
            sessionStorage.setItem('user', JSON.stringify(parsedUser));

            // You might also want to store refresh token and other info securely
            if (refresh_token) {
                Cookies.set('refresh_token', refresh_token, { expires: 7 }); // Optional: Store refresh token
            }

            // Optional: Store expiration time
            if (expires_at) {
                const expirationTime = new Date(parseInt(expires_at) * 1000);
                Cookies.set('expires_at', expirationTime.toISOString(), { expires: 7 });
            }

            // Redirect to success page
            router.push('/login/success');
        } else {
            router.push('/login');
        }
    }, [searchParams, router]);  // Use searchParams in dependencies

    return <div className="bg-gray-900 text-white min-h-screen mx-auto">Loading...</div>;
};

const OAuthCallbackSuspense = () => {
    return (
        <Suspense fallback={<div className="bg-gray-900 text-white min-h-screen mx-auto">Loading...</div>}>
            <OAuthCallback />
        </Suspense>
    );
};

export default OAuthCallbackSuspense;