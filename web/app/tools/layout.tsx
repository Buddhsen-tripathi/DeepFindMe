import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}