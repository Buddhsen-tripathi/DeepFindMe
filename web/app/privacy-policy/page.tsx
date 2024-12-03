import { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicy() {
    return (
        <main className="flex-grow">
        <NavBar />
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-100">Privacy Policy</h1>
          <div className="bg-gray-800 p-8 rounded-lg border border-cyan-500">
            <p className="mb-4 text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">1. Introduction</h2>
              <p className="text-gray-300">Welcome to DeepFind ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our OSINT (Open Source Intelligence) tools and services.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">2. Information We Collect</h2>
              <p className="text-gray-300">We may collect personal information that you provide to us, such as:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-300">
                <li>Name</li>
                <li>Email address</li>
                <li>IP address</li>
                <li>Usage data related to our OSINT tools</li>
              </ul>
              <p className="text-gray-300">We may also automatically collect certain information when you visit our website, including:</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>Browser type</li>
                <li>Device information</li>
                <li>Log data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">3. How We Use Your Information</h2>
              <p className="text-gray-300">We use your information to:</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>Provide and maintain our OSINT services</li>
                <li>Improve and personalize user experience</li>
                <li>Analyze usage of our tools</li>
                <li>Communicate with you about our services</li>
                <li>Ensure compliance with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">4. Data Security</h2>
              <p className="text-gray-300">We implement security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. We strive to use commercially acceptable means to protect your personal information but cannot guarantee its absolute security.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">5. Third-Party Services</h2>
              <p className="text-gray-300">We may use third-party services that collect, monitor, and analyze data. These third parties have their own privacy policies addressing how they use such information. We do not share your personal information with third parties unless required by law or with your explicit consent.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">6. Your Data Protection Rights</h2>
              <p className="text-gray-300">Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. Please contact us if you wish to exercise these rights.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">7. Changes to This Privacy Policy</h2>
              <p className="text-gray-300">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">8. Contact Us</h2>
              <p className="text-gray-300">If you have any questions about this Privacy Policy, please contact us at privacy@deepfind.me</p>
            </section>
          </div>
        </div>
        <Footer/>
      </main>
    )
}