'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';

const SSOCallback: React.FC = () => {
    const searchParams = useSearchParams();
    const { handleRedirectCallback } = useClerk();

    useEffect(() => {
        const afterSignUpUrl = searchParams.get('after_sign_up_url') || '/login/success';

        const handleSSOCallback = async () => {
            try {
                await handleRedirectCallback({
                    afterSignUpUrl,
                    redirectUrl: afterSignUpUrl,
                });
            } catch (error) {
                console.error('SignUp SSO Callback Error:', error);
            }
        };

        handleSSOCallback();
    }, [searchParams, handleRedirectCallback]);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <p>Processing sign-up...</p>
        </div>
    );
};

// Wrap your component in Suspense
const SuspenseWrapper: React.FC = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <SSOCallback />
        </Suspense>
    );
};

export default SuspenseWrapper;