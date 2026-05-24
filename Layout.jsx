// src/components/layout/Layout.jsx
import Navbar    from '../navbar/Navbar'
import Footer    from '../footer/Footer'
import MobileNav from './MobileNav'

export default function Layout({ children, hideFooter = false }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        {children}
      </main>
      {!hideFooter && <Footer />}
      <MobileNav />
    </div>
  )
}
