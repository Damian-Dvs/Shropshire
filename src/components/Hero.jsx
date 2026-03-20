export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center text-center text-white min-h-[90vh] bg-hero bg-cover bg-center"
    >
      {/* Enhanced overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-45 z-0" />

      <div className="relative z-10 px-4 py-20 sm:py-28 md:py-36 lg:py-44 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-md">
          ShropShine Cleaning
          <span className="block text-xl sm:text-2xl font-normal mt-2">
            Domestic Cleaners in Oswestry &amp; Shropshire
          </span>
        </h1>
        <p className="text-lg sm:text-xl mb-6 drop-shadow">
          Your local, trusted cleaning team — reliable, fully insured, and proud of every clean we do.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="/#contact"
            aria-label="Request a cleaning slot with ShropShine"
            className="inline-flex items-center justify-center bg-white text-primary font-semibold px-6 py-3 rounded shadow hover:bg-soft hover:scale-105 transform transition-all duration-200"
          >
            Request a Slot
          </a>
          <a
            href="tel:07532029849"
            aria-label="Call ShropShine Cleaning on 07532 029849"
            className="inline-flex items-center justify-center gap-2 bg-primary/80 border border-white/40 px-6 py-3 rounded font-semibold text-white hover:bg-primary hover:scale-105 transform transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14v2.92z"/>
            </svg>
            07532 029849
          </a>
          <a
            href="/#services"
            aria-label="Explore ShropShine cleaning services"
            className="inline-flex items-center justify-center border border-white/70 px-6 py-3 rounded font-semibold text-white hover:bg-white/10 hover:scale-105 transform transition-all duration-200"
          >
            View Services
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-white/90">
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-300 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            Fully insured
          </span>
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-300 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            Family run
          </span>
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-300 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            5-star rated
          </span>
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-300 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            Local to Shropshire
          </span>
        </div>
      </div>
    </section>
  );
}
