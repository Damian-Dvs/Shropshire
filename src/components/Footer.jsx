import { Link } from "react-router-dom";

const AREA_LINKS = [
  { label: "Oswestry",    href: "/cleaners-oswestry" },
  { label: "Ellesmere",   href: "/cleaners-ellesmere" },
  { label: "Shrewsbury",  href: "/cleaners-shrewsbury" },
  { label: "Gobowen",     href: "/cleaners-gobowen" },
  { label: "St Martins",  href: "/cleaners-st-martins" },
  { label: "Chirk",       href: "/cleaners-chirk" },
  { label: "Llangollen",  href: "/cleaners-llangollen" },
  { label: "Whittington", href: "/cleaners-whittington" },
  { label: "Weston Rhyn", href: "/cleaners-weston-rhyn" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-10 pb-6 mt-0">
      <div className="max-w-6xl mx-auto px-4">

        {/* Top row: NAP + areas grid */}
        <div className="flex flex-col md:flex-row gap-10 mb-8">

          {/* NAP block */}
          <address className="not-italic text-white min-w-max">
            <strong className="text-lg">ShropShine Cleaning</strong>
            <br />
            St Martins, Shropshire, UK
            <br />
            <a href="tel:07532029849" className="hover:underline hover:text-soft">
              07532 029849
            </a>
            <br />
            <a
              href="mailto:bookings@shropshinecleaning.com"
              className="hover:underline hover:text-soft"
            >
              bookings@shropshinecleaning.com
            </a>
            <br />
            <a
              href="https://www.facebook.com/61579277243121"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-soft"
            >
              Facebook
            </a>
          </address>

          {/* Areas we cover */}
          <div>
            <p className="text-soft/80 text-xs font-semibold uppercase tracking-widest mb-3">
              Areas We Cover
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1 text-sm">
              {AREA_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="hover:text-soft hover:underline transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row: copyright */}
        <div className="border-t border-white/20 pt-4 text-sm text-center text-white/70">
          © {new Date().getFullYear()} ShropShine Cleaning. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
