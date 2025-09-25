import MapServiceArea from "./MapServiceArea";

export default function About() {
  return (
    <section id="about" className="bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main header */}
        <h2 className="text-3xl font-bold text-primary mb-6">About ShropShine</h2>

        {/* Main intro */}
        <p className="text-gray-700 leading-relaxed text-lg mb-8">
          ShropShine is a family-run cleaning company serving homes and businesses across
          Shropshire. We pride ourselves on <strong>reliability</strong>,{" "}
          <strong>attention to detail</strong>, and bringing a shine to every space we
          clean. Whether you need regular home cleans or one-off deep cleaning, we’re here
          to help — with a sparkle.
        </p>

        {/* Areas + Map */}
        <div className="mt-12 text-left">
          <h3 className="text-3xl font-bold text-primary text-center mb-6">
            Areas we serve
          </h3>
          <p className="text-gray-700 leading-relaxed text-lg text-center mb-6">
            We provide domestic and commercial cleaning locally, covering towns and
            villages within roughly a 9-mile radius of St Martins.
          </p>

          <MapServiceArea />
        </div>

        {/* Insurance section */}
        <div className="mt-16">
          <div className="rounded-3xl border border-primary/15 bg-white px-6 py-10 text-center shadow-xl sm:px-10">
            <div className="mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-sm font-semibold uppercase tracking-wide text-primary shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.253l.867-.5a4 4 0 013.266 0l.867.5a4 4 0 012 3.464v4.566a4 4 0 01-2 3.464l-.867.5a4 4 0 01-3.266 0l-.867-.5a4 4 0 00-3.266 0l-.867.5a4 4 0 01-3.266 0l-.867-.5a4 4 0 01-2-3.464V9.717a4 4 0 012-3.464l.867-.5a4 4 0 013.266 0l.867.5a4 4 0 003.266 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4"
                    />
                  </svg>
                  Insurance
                </span>
                <h3 className="mt-4 text-3xl font-bold text-primary">
                  Fully insured for every clean
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                  For your peace of mind, ShropShine is fully insured through Simply
                  Business. Our cover is in place for every residential and commercial
                  booking we complete, so your home or workspace is always protected.
                </p>
                <ul className="mt-6 space-y-3 text-gray-700 text-center">
                  <li className="flex flex-col items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Policy arranged and verified by Simply Business.</span>
                  </li>
                  <li className="flex flex-col items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Cover applies to every job we perform in Shropshire.</span>
                  </li>
                  <li className="flex flex-col items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Certificate available instantly for your records.</span>
                  </li>
                </ul>

                <a
                  href="https://quote.simplybusiness.co.uk/certificate/policy-overview/IMg17JpKAbrMB_bThUgx9Q/?ref_id=RAFXA_CHBI5164646XB1&source=popBadge"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-white shadow transition hover:scale-105 hover:bg-primary/90"
                >
                  View our insurance details
                </a>
                <div className="mt-10 flex flex-col items-center gap-3 text-sm text-gray-500">
                  <span>Insurance provider</span>
                  <picture>
                    <source
                      srcSet="https://quote.simplybusiness.co.uk/assets/ci5/sb/badge_logo.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="https://quote.simplybusiness.co.uk/assets/ci5/sb/badge_logo.png"
                      type="image/png"
                    />
                    <img
                      alt="Simply Business"
                      loading="lazy"
                      width="110"
                      height="28"
                      src="https://quote.simplybusiness.co.uk/assets/ci5/sb/badge_logo.png"
                      className="opacity-80"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
