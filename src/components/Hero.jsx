export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center text-center text-white min-h-[90vh] bg-hero bg-cover bg-center"
    >
      {/* Enhanced overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />

      <div className="relative z-10 px-4 py-20 sm:py-28 md:py-36 lg:py-44 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-md">
          ShropShine Cleaning
          <span className="block text-xl sm:text-2xl font-normal mt-2">
            Domestic & Commercial Cleaners in Shropshire
          </span>
        </h1>
        <p className="text-lg sm:text-xl mb-6 drop-shadow">
          Family-run specialists for standard, deep and end-of-tenancy cleans across Shropshire.
        </p>
        <a
          href="/#contact"
          aria-label="Request a cleaning slot with ShropShine"
          className="inline-block bg-white text-primary font-semibold px-6 py-3 rounded shadow hover:bg-soft hover:scale-105 transform transition-all duration-200"
        >
          Request a Slot
        </a>
      </div>
    </section>
  );
}
