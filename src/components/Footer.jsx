export default function Footer() {
  return (
    <footer className="bg-primary text-white py-6 mt-0">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-center md:text-left space-y-4 md:space-y-0">
        
        {/* NAP block for Local SEO */}
        <address className="not-italic text-white">
          <strong>ShropShine Cleaning</strong>
          <br />
          Shropshire, UK
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

        {/* Legal / year */}
        <p className="text-white">
          © {new Date().getFullYear()} ShropShine Cleaning. All rights reserved.
        </p>

        {/* Attribution */}
        <p className="text-white">
          Website created by{" "}
          <a
            href="https://ddesigns.example.com"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="hover:underline hover:text-soft"
          >
            DDesigns
          </a>
        </p>
      </div>
    </footer>
  );
}
