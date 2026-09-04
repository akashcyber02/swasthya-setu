import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, CheckCircle, ShieldCheck } from 'lucide-react';
import { Language } from '../data/translations';

interface InstallAppBannerProps {
  language: Language;
}

export const InstallAppBanner: React.FC<InstallAppBannerProps> = ({ language }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsVisible(false);
    });

    // Check if launched as PWA standalone
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      setIsVisible(false);
    } else {
      // Fallback instruction
      alert(
        language === 'mr'
          ? 'तुमच्या ब्राउझर मेनूमध्ये (⋮) जाऊन "Add to Home screen" किंवा "Install App" निवडा.'
          : language === 'hi'
          ? 'अपने ब्राउज़र मेनू (⋮) में जाकर "Add to Home screen" या "Install App" चुनें।'
          : 'Tap browser menu (⋮) and select "Add to Home screen" or "Install App" to install.'
      );
    }
  };

  if (isInstalled || !isVisible) return null;

  return (
    <div className="pwa-install-floating-banner">
      <div className="pwa-banner-content">
        <div className="pwa-icon-box">
          <Smartphone size={24} />
        </div>
        <div className="pwa-text-box">
          <strong>
            {language === 'mr'
              ? 'Swasthya Setu ॲप इन्स्टॉल करा'
              : language === 'hi'
              ? 'Swasthya Setu ऐप इंस्टॉल करें'
              : 'Install Swasthya Setu Mobile App'}
          </strong>
          <span>
            {language === 'mr'
              ? 'ऑफलाइन ॲक्सेस, १०८ इमर्जन्सी व जलद नेव्हिगेशन'
              : language === 'hi'
              ? 'ऑफलाइन एक्सेस, १०८ इमरजेंसी और त्वरित नेविगेशन'
              : 'Fast offline access, 108 SOS & instant doctor token'}
          </span>
        </div>
      </div>

      <div className="pwa-actions-group">
        <button className="pwa-install-action-btn" onClick={handleInstallClick}>
          <Download size={16} />
          <span>{language === 'mr' ? 'इन्स्टॉल करा' : language === 'hi' ? 'इंस्टॉल करें' : 'Install'}</span>
        </button>
        <button
          className="pwa-dismiss-btn"
          onClick={() => setIsVisible(false)}
          aria-label="Close install banner"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default InstallAppBanner;
