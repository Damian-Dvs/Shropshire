export default function FacebookTeaser() {
  const fbPage = "https://www.facebook.com/61579277243121"; // update later to vanity URL

  return (
    <section id="facebook" className="py-16 md:py-20 bg-soft">
      <div className="mx-auto max-w-6xl px-4">
        {/* Section heading (centred, consistent with other sections) */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Follow us on Facebook
          </h2>
          <p className="mt-2 text-slate-600">
            See recent jobs, reviews and updates from ShropShine Cleaning.
          </p>
        </div>

        {/* Card — centred, same width rhythm as other content */}
        <a
          href={fbPage}
          target="_blank"
          rel="noopener noreferrer"
          className="group mx-auto block max-w-4xl rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden transition-shadow hover:shadow-md"
          aria-label="Open ShropShine Cleaning on Facebook (opens in a new tab)"
        >
          <div className="flex flex-col md:flex-row">
            {/* Accent panel (keeps brand feel without being loud) */}
            <div className="md:w-2/5 bg-gradient-to-br from-emerald-500 to-teal-500 p-8 flex items-center justify-center text-white">
              <div className="flex items-center gap-3">
                <svg
                  className="h-8 w-8 opacity-95 transition-transform group-hover:scale-105"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.6V12h2.8V9.8c0-2.8 1.7-4.4 4.3-4.4 1.2 0 2.5.2 2.5.2v2.7h-1.4c-1.4 0-1.9.9-1.9 1.8V12h3.2l-.5 2.9h-2.7v7A10 10 0 0 0 22 12Z"
                  />
                </svg>
                <span className="text-lg font-semibold">We’re on Facebook</span>
              </div>
            </div>

            {/* Copy + CTA */}
            <div className="md:w-3/5 p-8">
              <p className="text-slate-700">
                Photos from recent cleans, handy tips, and the latest updates.
              </p>

              <div className="mt-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors group-hover:bg-emerald-600">
                  Open on Facebook
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a1 1 0 011-1h8.586L9.293 5.707a1 1 0 111.414-1.414l5.999 6a1 1 0 010 1.414l-5.999 6a1 1 0 11-1.414-1.414L12.586 11H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <p className="mt-2 text-xs text-slate-500">Opens in a new tab.</p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}