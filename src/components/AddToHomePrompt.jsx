import { useEffect, useState } from 'react';

function AddToHomePrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isInStandalone = ('standalone' in window.navigator) && window.navigator.standalone;

    setIsIos(isIosDevice && !isInStandalone);

    // Android + Chrome support
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setShowPrompt(false);
      }
    }
  };

  if (!showPrompt && !isIos) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-teal-600 px-4 py-3 rounded-lg shadow-xl text-black z-50 max-w-sm w-full text-center">
      {isIos ? (
        <>
          <p className="text-sm">
            Add <strong>HB95</strong> to your Home Screen:<br />
            Tap <span className="font-bold">Share</span> then <span className="font-bold">‘Add to Home Screen’</span>
          </p>
        </>
      ) : (
        <>
          <p className="text-sm">Add <strong>HB95</strong> to your Home Screen!</p>
          <button
            className="mt-2 bg-teal-600 text-white px-4 py-2 rounded shadow hover:bg-teal-700 transition"
            onClick={handleInstall}
          >
            Add Now
          </button>
        </>
      )}
    </div>
  );
}

export default AddToHomePrompt;
