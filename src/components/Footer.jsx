export default function Footer() {
    return (
      <footer className="bg-primary text-white py-6 mt-0">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-center md:text-left space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} ShropShine Cleaning. All rights reserved.</p>
          <div className="space-x-3">
            <a
              href="mailto:hello@shropshine.co.uk"
              className="hover:underline hover:text-soft"
            >
              hello@shropshine.co.uk
            </a>
            <span>|</span>
            <a
              href="tel:+447123456789"
              className="hover:underline hover:text-soft"
            >
              +44 7123 456789
            </a>
          </div>
          <p className="text-white">Website created by DDesigns</p>
        </div>
      </footer>
    );
  }
  