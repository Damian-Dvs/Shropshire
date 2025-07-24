import { useEffect, useState } from 'react';

function AddToHomePrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const hasSeenPrompt = localStorage.getItem('hb95AddPromptDismissed');
    if (hasSeenPrompt) return;

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
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg border px-4 py-2 rounded text-black z-50 flex items-center justify-between gap-4">
      <p className="text-sm">Add HB95 to your Home Screen for quick access!</p>
      <div className="flex gap-2">
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
    </div>
  );
}

export default AddToHomePrompt;
