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
          clean.</p>
          <p className="text-gray-700 leading-relaxed text-lg mb-8">Whether you need regular home cleans or one-off deep cleaning, we’re here
          to help. Regular and one-off cleans are available in Oswestry,
          Ellesmere, Gobowen, Shrewsbury and neighbouring towns and villages.
        </p>

        {/* Areas + Map */}
        <div className="mt-12 text-left">
          <h3 className="text-3xl font-bold text-primary text-center mb-6">
            Areas we serve
          </h3>
          <p className="text-gray-700 leading-relaxed text-lg text-center mb-6">
            We provide domestic and commercial cleaning locally, covering towns and
            villages within roughly a 10-mile radius of St Martins.
          </p>

          <MapServiceArea />
        </div>

        {/* Insurance section */}
        <div className="mt-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-primary">Fully insured for every clean</h3>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                For your peace of mind, ShropShine is fully insured through Simply Business.
                Cover applies to every residential and commercial booking, so your home or
                workspace is protected from the moment we arrive.
              </p>

              <div className="mt-6 grid gap-4 text-gray-700 sm:grid-cols-2">
                <div className="flex flex-col items-center gap-3 rounded-3xl border border-primary/15 bg-white p-6 text-center shadow-lg">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>Policy arranged and verified by Simply Business.</span>
                </div>
                <div className="flex flex-col items-center gap-3 rounded-3xl border border-primary/15 bg-white p-6 text-center shadow-lg">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>Cover applies to every job we perform across Shropshire.</span>
                </div>
                <div className="flex flex-col items-center gap-3 rounded-3xl border border-primary/15 bg-white p-6 text-center shadow-lg sm:col-span-2">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>Instant certificate available to share with your landlord or facilities team.</span>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <a
                  href="https://quote.simplybusiness.co.uk/certificate/policy-overview/IMg17JpKAbrMB_bThUgx9Q/?ref_id=RAFXA_CHBI5164646XB1&source=popBadge"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-white shadow transition hover:scale-105 hover:bg-primary/90"
                >
                  View our insurance details
                </a>
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center gap-3 text-center text-sm text-gray-600">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Insurance provider
              </span>
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
                  width="96"
                  height="24"
                  src="https://quote.simplybusiness.co.uk/assets/ci5/sb/badge_logo.png"
                  className="mx-auto opacity-90 h-12 w-auto sm:h-12"
                />
              </picture>
              <p className="max-w-xs text-xs text-gray-500">
                Fully insured through Simply Business, the UK’s leading small business
                insurance platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
