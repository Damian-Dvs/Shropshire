import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="bg-primary text-white fixed top-0 left-0 w-full z-50 shadow-md backdrop-blur bg-opacity-95 transition-all duration-300"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
        <a href="#" className="text-xl font-bold">ShropShine</a>

        {/* Desktop nav */}
        <div className="hidden md:flex space-x-6">
          <a href="#home" className="hover:text-soft transition">Home</a>
          <a href="#services" className="hover:text-soft transition">Services</a>
          <a href="#about" className="hover:text-soft transition">About</a>
          <a href="#testimonials" className="hover:text-soft">Testimonials</a>
          <a href="#contact" className="hover:text-soft transition">Contact</a>
        </div>

        {/* Mobile burger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                menuOpen
                  ? "M6 18L18 6M6 6l12 12" // X icon
                  : "M4 6h16M4 12h16M4 18h16" // Hamburger
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile nav links */}
      {menuOpen && (
        <div className="md:hidden bg-primary bg-opacity-95 flex flex-col items-center py-4 space-y-4 transition-all duration-300">
          <a href="#home" className="hover:text-soft">Home</a>
          <a href="#services" className="hover:text-soft">Services</a>
          <a href="#about" className="hover:text-soft">About</a>
          <a href="#contact" className="hover:text-soft">Contact</a>
          <a href="#testimonials" className="hover:text-soft">Testimonials</a>
        </div>
      )}
    </nav>
  );
}
