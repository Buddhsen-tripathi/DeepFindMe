import { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Our terms of service outline the rules and regulations for the use of our website and services.',
}

export default function TermsOfService() {
    return (
        <main className="flex-grow">
        <NavBar />
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-100">Terms of Service</h1>
          <div className="bg-gray-800 p-8 rounded-lg border border-cyan-500">
            <p className="mb-4 text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">1. Acceptance of Terms</h2>
              <p className="text-gray-300">By accessing and using DeepFind's website and services, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">2. Use of Services</h2>
              <p className="text-gray-300">You agree to use our OSINT tools and services only for lawful purposes and in accordance with these Terms of Service. You are prohibited from:</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>Violating any applicable laws or regulations</li>
                <li>Infringing on the rights of others</li>
                <li>Using our tools for malicious purposes or to harm others</li>
                <li>Attempting to gain unauthorized access to our systems or user accounts</li>
                <li>Interfering with or disrupting our services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">3. User Accounts</h2>
              <p className="text-gray-300">When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password. You agree to notify us immediately of any unauthorized use of your account.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">4. Intellectual Property</h2>
              <p className="text-gray-300">The content, features, and functionality of our website and OSINT tools are owned by DeepFind and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of our content without explicit permission.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">5. Limitation of Liability</h2>
              <p className="text-gray-300">DeepFind shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. We provide our tools "as is" without any warranty of any kind.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">6. Ethical Use</h2>
              <p className="text-gray-300">You agree to use our OSINT tools ethically and responsibly. Do not use our services to violate privacy laws, harass individuals, or conduct illegal activities. We reserve the right to terminate your access if we suspect misuse.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">7. Termination</h2>
              <p className="text-gray-300">We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without notice, for any reason, including breach of these Terms of Service.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">8. Changes to Terms</h2>
              <p className="text-gray-300">We may modify these Terms of Service at any time. Your continued use of our services after any changes indicates your acceptance of the modified terms.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">9. Governing Law</h2>
              <p className="text-gray-300">These Terms of Service shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. If you access this service from outside India, you are responsible for compliance with local laws as applicable.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">10. Contact Us</h2>
              <p className="text-gray-300">If you have any questions about these Terms of Service, please contact us at contact@deepfind.me</p>
            </section>
          </div>
        </div>
        <Footer/>
      </main>
    )
}