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

        if (error) {
            // Handle error, maybe show an error page
            console.error("OAuth error:", error);
            router.push('/login');
            return;
        }

        if (access_token && user) {
            // Store access token and user data (you can also use sessionStorage or localStorage)
            Cookies.set('access_token', access_token, { expires: 7 });  // Store in cookies
            sessionStorage.setItem('user', user);

            // Redirect to success page
            router.push('/login/success');
        } else {
            router.push('/login');
        }
    }, [searchParams, router]);  // Use searchParams in dependencies

    return <div className='bg-gray-900 text-white min-h-screen mx-auto'>Loading...</div>;
};

const OAuthCallbackSuspense = () => {
    return (
        <Suspense fallback={<div className='bg-gray-900 text-white min-h-screen mx-auto'>Loading...</div>}>
            <OAuthCallback />
        </Suspense>
    );
};

export default OAuthCallbackSuspense;