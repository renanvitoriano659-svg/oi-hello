import { useEffect, useState } from "react";
import { hasTrackingIds, readConsent, recordPageView, saveConsent } from "@/lib/analytics";

export function TrackingConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    recordPageView();
    setVisible(hasTrackingIds() && readConsent() === null);
  }, []);
  if (!visible) return null;
  return (
    <aside className="consent-banner" aria-label="Preferências de privacidade">
      <p>
        Podemos usar ferramentas de análise do Google e do TikTok para entender as visitas e
        melhorar esta experiência?
      </p>
      <div>
        <button
          onClick={() => {
            saveConsent(false);
            setVisible(false);
          }}
        >
          Somente essenciais
        </button>
        <button
          className="button button-dark"
          onClick={() => {
            saveConsent(true);
            setVisible(false);
          }}
        >
          Aceitar análise
        </button>
      </div>
    </aside>
  );
}
