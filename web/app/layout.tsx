import type { Metadata } from "next";
import "./globals.css";
import Script from 'next/script';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: "DeepFind.Me",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
    <html lang="en">
      <head>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8627226194830904"
          crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
