import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-lg w-full px-4">
        <div className="text-center mb-8">
          <Link href="/">
            <Image
              src="/logo-white.webp"
              alt="Logo"
              width={150}
              height={50}
              className="mx-auto"
            />
          </Link>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500">
          <h1 className="text-2xl font-bold text-center mb-6">Sign in to DeepFind.Me</h1>
          <div className='flex justify-center'>
          <SignIn
            routing="path"
            path="/login"
            afterSignInUrl="/login/success"
            signUpUrl="/signup"
            redirectUrl="/login/sso-callback"
          />
          </div>
        </div>
      </div>
    </div>
  );
}