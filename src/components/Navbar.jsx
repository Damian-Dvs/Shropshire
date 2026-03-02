import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AREA_LINKS = [
  { label: "Oswestry",     href: "/cleaners-oswestry" },
  { label: "Ellesmere",    href: "/cleaners-ellesmere" },
  { label: "Shrewsbury",   href: "/cleaners-shrewsbury" },
  { label: "Gobowen",      href: "/cleaners-gobowen" },
  { label: "St Martins",   href: "/cleaners-st-martins" },
  { label: "Chirk",        href: "/cleaners-chirk" },
  { label: "Llangollen",   href: "/cleaners-llangollen" },
  { label: "Whittington",  href: "/cleaners-whittington" },
  { label: "Weston Rhyn",  href: "/cleaners-weston-rhyn" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setAreasOpen(false);
      }
    };
    if (menuOpen || areasOpen) {
      document.addEventListener("keydown", onKeyDown);
    }
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, areasOpen]);

  return (
    <nav
      className="bg-primary text-white fixed top-0 left-0 w-full z-50 shadow-md backdrop-blur bg-opacity-95 transition-all duration-300"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="/#home" className="flex items-center" aria-label="ShropShine Home">
          <img src="/logo.png" alt="ShropShine Logo" className="h-12 w-auto" />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="/#home" className="hover:text-soft transition py-2">Home</a>
          <a href="/#services" className="hover:text-soft transition py-2">Services</a>
          <a href="/#about" className="hover:text-soft transition py-2">About</a>

          {/* Areas dropdown */}
          <div className="relative">
            <button
              onClick={() => setAreasOpen((v) => !v)}
              className="flex items-center gap-1 hover:text-soft transition py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
              aria-haspopup="true"
              aria-expanded={areasOpen}
            >
              Areas
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${areasOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {areasOpen && (
              <div
                className="absolute top-full left-0 mt-1 bg-white text-dark shadow-xl rounded-xl py-2 w-48 z-50"
                onMouseLeave={() => setAreasOpen(false)}
              >
                {AREA_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    to={href}
                    className="block px-4 py-2 text-sm hover:bg-soft hover:text-primary transition"
                    onClick={() => setAreasOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <a href="/#testimonials" className="hover:text-soft transition py-2">Testimonials</a>
          <a href="/#contact" className="hover:text-soft transition py-2">Contact</a>
        </div>

        {/* Mobile burger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
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
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      <div
        id="mobile-menu"
        role="menu"
        aria-labelledby="mobile-menu-button"
        aria-hidden={!menuOpen}
        className={`md:hidden bg-primary bg-opacity-95 flex flex-col items-center space-y-3 overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[36rem] py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        <a href="/#home" className="hover:text-soft py-2" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="/#services" className="hover:text-soft py-2" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="/#about" className="hover:text-soft py-2" onClick={() => setMenuOpen(false)}>About</a>

        {/* Mobile areas list */}
        <div className="w-full text-center">
          <p className="text-soft/70 text-xs font-semibold uppercase tracking-widest mb-2">Areas We Cover</p>
          <div className="flex flex-wrap justify-center gap-2 px-4">
            {AREA_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                className="rounded-full border border-white/30 px-3 py-1 text-sm hover:bg-white/10 transition"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <a href="/#testimonials" className="hover:text-soft py-2" onClick={() => setMenuOpen(false)}>Testimonials</a>
        <a href="/#contact" className="hover:text-soft py-2" onClick={() => setMenuOpen(false)}>Contact</a>
      </div>
    </nav>
  );
}
