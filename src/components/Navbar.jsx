import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu with ESC and move focus into menu when opened
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    if (menuOpen) {
      document.addEventListener('keydown', onKeyDown);
      // Focus first link for keyboard users
      requestAnimationFrame(() => {});
    }
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <nav
      className="bg-primary text-white fixed top-0 left-0 w-full z-50 shadow-md backdrop-blur bg-opacity-95 transition-all duration-300"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src="/logo.png" alt="ShropShine Logo" className="h-12 w-auto" />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex space-x-6">
          <a href="#home" className="hover:text-soft transition py-2">Home</a>
          <a href="#services" className="hover:text-soft transition py-2">Services</a>
          <a href="#about" className="hover:text-soft transition py-2">About</a>
          <a href="#testimonials" className="hover:text-soft transition py-2">Testimonials</a>
          <a href="#contact" className="hover:text-soft transition py-2">Contact</a>
        </div>

        {/* Mobile burger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
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
        <div
          id="mobile-menu"
          role="menu"
          aria-labelledby="mobile-menu-button"
          className="md:hidden bg-primary bg-opacity-95 flex flex-col items-center py-4 space-y-4 transition-all duration-300"
        >
          <a href="#home" className="hover:text-soft py-2" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#services" className="hover:text-soft py-2" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#about" className="hover:text-soft py-2" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#testimonials" className="hover:text-soft py-2" onClick={() => setMenuOpen(false)}>Testimonials</a>
          <a href="#contact" className="hover:text-soft py-2" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      )}
    </nav>
  );
}
