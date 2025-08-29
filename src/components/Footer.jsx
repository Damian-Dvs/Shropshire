export default function Footer() {
    return (
      <footer className="bg-primary text-white py-6 mt-0">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-center md:text-left space-y-4 md:space-y-0">
          <p>{new Date().getFullYear()} ShropShine Cleaning. All rights reserved.</p>
          <div className="space-x-3">
            <a
              href="mailto:hello@shropshinecleaning.com"
              className="hover:underline hover:text-soft"
            >
              hello@shropshinecleaning.com
            </a>
            <span>|</span>
            <a
              href="tel:+44000000000000"
              className="hover:underline hover:text-soft"
            >
              +44 700000000000
            </a>
          </div>
          <p className="text-white">Website created by DDesigns</p>
        </div>
      </footer>
    );
  }
  