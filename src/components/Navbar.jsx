import { useState } from "react"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-primary text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-7 flex items-center justify-between">
        <a href="#" className="text-xl font-bold">ShropShine</a>
        <div className="hidden md:flex space-x-6">
          <a href="#home" className="hover:text-soft">Home</a>
          <a href="#services" className="hover:text-soft">Services</a>
          <a href="#about" className="hover:text-soft">About</a> {/* ← Added here */}
          <a href="#contact" className="hover:text-soft">Contact</a>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-primary flex flex-col items-center py-4 space-y-4">
          <a href="#home" className="hover:text-soft">Home</a>
          <a href="#services" className="hover:text-soft">Services</a>
          <a href="#about" className="hover:text-soft">About</a> {/* ← And here */}
          <a href="#contact" className="hover:text-soft">Contact</a>
        </div>
      )}
    </nav>
  )
}