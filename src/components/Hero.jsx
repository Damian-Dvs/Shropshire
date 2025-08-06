export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center text-center text-white min-h-[90vh] bg-hero bg-cover bg-center"
    >
      {/* Optional semi-transparent overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-20 z-0" />

      <div className="relative z-10 px-4 py-20 sm:py-28 md:py-36 lg:py-44 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Sparkle with <span className="text-white">ShropShine</span>
        </h1>
        <p className="text-lg sm:text-xl mb-6">
          Domestic and commercial cleaning across Shropshire.
        </p>
        <a
          href="#contact"
          className="inline-block bg-white text-primary font-semibold px-6 py-3 rounded shadow hover:bg-soft transition"
        >
          Request a Slot
        </a>
      </div>
    </section>
  );
}
