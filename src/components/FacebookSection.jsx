import { useCallback } from "react";

export default function FacebookTeaser() {
  const pageId = "61579277243121";
  const fbWebUrl = `https://www.facebook.com/${pageId}`;

  const isIOS = () =>
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = () => /Android/.test(navigator.userAgent);

  const openFacebook = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAndroid()) {
      // Android: intent deep link with built-in web fallback
      const intentUrl =
        `intent://page/${pageId}` +
        `#Intent;scheme=fb;package=com.facebook.katana;` +
        `S.browser_fallback_url=${encodeURIComponent(fbWebUrl)};end`;
      window.location.href = intentUrl;
      return;
    }

    if (isIOS()) {
      // iOS: try app scheme, then fallback to web
      const start = Date.now();
      const appUrl = `fb://profile/${pageId}`; // works better on iOS than fb://page
      window.location.href = appUrl;

      setTimeout(() => {
        // if app didn't take focus, open web URL
        if (Date.now() - start < 1600) {
          window.location.href = fbWebUrl;
        }
      }, 800);
      return;
    }

    // Desktop or unknown: just open the web page in a new tab
    window.open(fbWebUrl, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <section id="facebook" className="py-16 md:py-20 bg-soft">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl text-primary md:text-3xl font-semibold tracking-tight">
            Follow us on Facebook
          </h2>
          <p className="mt-2 text-slate-600">
            See recent jobs, reviews and updates from ShropShine Cleaning.
          </p>
        </div>

        {/* Card (not an <a>) so clicks don't open a new tab */}
        <div
          className="group mx-auto max-w-4xl rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden transition-shadow hover:shadow-md"
          role="region"
          aria-label="ShropShine Cleaning on Facebook"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 bg-gradient-to-br from-emerald-500 to-teal-500 p-8 flex items-center justify-center text-white">
              <div className="flex items-center gap-3">
                <svg className="h-8 w-8 opacity-95" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.6V12h2.8V9.8c0-2.8 1.7-4.4 4.3-4.4 1.2 0 2.5.2 2.5.2v2.7h-1.4c-1.4 0-1.9.9-1.9 1.8V12h3.2l-.5 2.9h-2.7v7A10 10 0 0 0 22 12Z"
                  />
                </svg>
                <span className="text-lg font-semibold">We’re on Facebook</span>
              </div>
            </div>

            <div className="md:w-3/5 p-8 flex flex-col items-center text-center">
              <p className="text-slate-700 max-w-prose">
                Photos from recent cleans, handy tips, and the latest updates.
              </p>

              {/* Primary CTA — matches your button style */}
              <button
                onClick={openFacebook}
                type="button"
                className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-white font-semibold shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Open on Facebook
                <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 011-1h8.586L9.293 5.707a1 1 0 111.414-1.414l5.999 6a1 1 0 010 1.414l-5.999 6a1 1 0 11-1.414-1.414L12.586 11H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Accessible web fallback link */}
              <p className="mt-2 text-xs text-slate-500">
                Or open in your browser:{" "}
                <a className="underline" href={fbWebUrl} target="_blank" rel="noopener noreferrer">
                  facebook.com/{pageId}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}