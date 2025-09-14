import { useCallback } from "react";

export default function FacebookTeaser() {
  const pageId = "61579277243121";
  const fbWebUrl = `https://www.facebook.com/${pageId}`;
  const fbIOSUrl = `fb://profile/${pageId}`; // iOS works better with profile/<id>
  const fbAndroidIntent = `intent://page/${pageId}#Intent;package=com.facebook.katana;scheme=fb;end`;

  const isIOS = () =>
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = () => /Android/.test(navigator.userAgent);

  const openFacebook = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    // Clean cancel function for any timeouts/listeners we create
    let fallbackTimer;

    const cancelFallback = () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      document.removeEventListener("visibilitychange", cancelIfHidden, true);
      window.removeEventListener("pagehide", cancelFallback, true);
      window.removeEventListener("blur", cancelFallback, true);
    };

    const cancelIfHidden = () => {
      if (document.visibilityState === "hidden") cancelFallback();
    };

    if (isAndroid()) {
      // ANDROID: intent will open the app; if not installed it shows chooser/fallback itself.
      // No JS fallback (prevents extra tab).
      window.location.href = fbAndroidIntent;
      return;
    }

    if (isIOS()) {
      // IOS: try deep link, then only fallback if the page stays visible.
      document.addEventListener("visibilitychange", cancelIfHidden, true);
      window.addEventListener("pagehide", cancelFallback, true);
      window.addEventListener("blur", cancelFallback, true);

      window.location.href = fbIOSUrl;

      // Fallback after a short delay ONLY if we didn't switch away
      fallbackTimer = setTimeout(() => {
        if (document.visibilityState !== "hidden") {
          // same-tab fallback to avoid opening a new tab
          window.location.href = fbWebUrl;
        }
        cancelFallback();
      }, 1200);
      return;
    }

    // Desktop: open web in a new tab
    window.open(fbWebUrl, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <section id="facebook" className="py-16 md:py-20 bg-soft">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl text-primary md:text-3xl font-semibold tracking-tight">
            Follow us on Facebook
          </h2>
          <p className="mt-2 text-slate-600">
            See recent jobs, reviews and updates from ShropShine Cleaning.
          </p>
        </div>

        <div className="mx-auto max-w-4xl rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 bg-gradient-to-br from-emerald-500 to-teal-500 p-8 flex items-center justify-center text-white">
              <div className="flex items-center gap-3">
                <svg className="h-8 w-8 opacity-95" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.6V12h2.8V9.8c0-2.8 1.7-4.4 4.3-4.4 1.2 0 2.5.2 2.5.2v2.7h-1.4c-1.4 0-1.9.9-1.9 1.8V12h3.2l-.5 2.9h-2.7v7A10 10 0 0 0 22 12Z" />
                </svg>
                <span className="text-lg font-semibold">We’re on Facebook</span>
              </div>
            </div>

            <div className="md:w-3/5 p-8 flex flex-col items-center text-center">
              <p className="text-slate-700 max-w-prose">
                Photos from recent cleans, handy tips, and the latest updates.
              </p>

              <button
                onClick={openFacebook}
                type="button"
                className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-white font-semibold shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Open on Facebook
                <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 10a1 1 0 011-1h8.586L9.293 5.707a1 1 0 111.414-1.414l5.999 6a1 1 0 010 1.414l-5.999 6a1 1 0 11-1.414-1.414L12.586 11H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}