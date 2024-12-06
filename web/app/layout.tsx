import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <meta name="google-adsense-account" content="ca-pub-8627226194830904"></meta>
      <body>
        {children}
      </body>
    </html>
  );
}
