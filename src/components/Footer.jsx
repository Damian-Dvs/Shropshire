export default function Footer() {
  return (
    <footer className="bg-primary text-white py-6 mt-0">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-center md:text-left space-y-4 md:space-y-0">
        
        {/* NAP block for Local SEO */}
        <div className="text-white">
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
        </div>

        {/* Legal / year */}
        <p className="text-white">
          © {new Date().getFullYear()} ShropShine Cleaning. All rights reserved.
        </p>

        {/* Attribution */}
        <p className="text-white">Website created by DDesigns</p>
      </div>
    </footer>
  );
}