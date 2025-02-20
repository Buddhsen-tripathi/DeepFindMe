'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';

const SSOCallback: React.FC = () => {
    const searchParams = useSearchParams();
    const { handleRedirectCallback } = useClerk();

    useEffect(() => {
        const afterSignInUrl = searchParams.get('after_sign_in_url') || '/login/success';

        const handleSSOCallback = async () => {
            try {
                await handleRedirectCallback({
                    afterSignInUrl,
                    redirectUrl: afterSignInUrl,
                });
            } catch (error) {
                console.error('SSO Callback Error:', error);
            }
        };

        handleSSOCallback();
    }, [searchParams, handleRedirectCallback]);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <p>Processing sign-in...</p>
        </div>
    );
};

export default SSOCallback;