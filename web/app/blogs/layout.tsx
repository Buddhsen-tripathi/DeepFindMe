import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <NavBar />
      <main className="pt-16 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}