// src/components/AddToHomePrompt.jsx
import { useEffect, useState } from 'react';

function AddToHomePrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
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

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg border px-4 py-2 rounded text-black z-50">
      <p className="text-sm">Add HB95 to your Home Screen for quick access!</p>
      <button
        className="mt-2 bg-teal-600 text-white px-3 py-1 rounded"
        onClick={handleInstall}
      >
        Add Now
      </button>
    </div>
  );
}

export default AddToHomePrompt;
