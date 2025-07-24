import { useEffect, useState } from 'react';

function isIos() {
  return (
    /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase()) &&
    !window.navigator.standalone
  );
}

function AddToHomePrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('hb95AddPromptDismissed');
    const alreadyStandalone = window.matchMedia('(display-mode: standalone)').matches;

    if (dismissed || alreadyStandalone) return;

    if (isIos()) {
      // iOS doesn't support beforeinstallprompt — show custom prompt after delay
      setTimeout(() => setShowPrompt(true), 2000);
    } else {
      // Android and others
      const handler = (e) => {
        e.preventDefault();
        window.deferredPrompt = e;
        setShowPrompt(true);
      };
      window.addEventListener('beforeinstallprompt', handler);
      return () => window.removeEventListener('beforeinstallprompt', handler);
    }
  }, []);

  const handleInstall = async () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
      const result = await window.deferredPrompt.userChoice;
      if (result.outcome === 'accepted') {
        localStorage.setItem('hb95AddPromptDismissed', 'true');
        setShowPrompt(false);
      }
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('hb95AddPromptDismissed', 'true');
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg border px-4 py-2 rounded text-black z-50 max-w-xs text-center">
      {isIos() ? (
        <>
          <p className="text-sm mb-2">
            Tap <span className="font-bold">Share</span> then{' '}
            <span className="font-bold">Add to Home Screen</span> to install HB95.
          </p>
          <button
            className="text-gray-500 hover:text-black text-sm mt-1"
            onClick={handleDismiss}
          >
            Dismiss
          </button>
        </>
      ) : (
        <>
          <p className="text-sm">Add HB95 to your Home Screen for quick access!</p>
          <div className="flex justify-center gap-2 mt-2">
            <button
              onClick={handleInstall}
              className="bg-teal-600 text-white px-3 py-1 rounded"
            >
              Add
            </button>
            <button
              onClick={handleDismiss}
              className="text-gray-500 hover:text-black text-sm"
            >
              Dismiss
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default AddToHomePrompt;
