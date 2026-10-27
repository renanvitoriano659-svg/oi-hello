import { siteConfig } from "@/config/site";

type AnalyticsEvent = "page_view" | "cta_click" | "checkout_exit" | "destination_pending";
type EventDetails = Record<string, string>;
type TrackingQueue = Array<unknown[]> & {
  page?: () => void;
  track?: (name: string, data: EventDetails) => void;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    ttq?: TrackingQueue;
    TiktokAnalyticsObject?: string;
  }
}

const consentKey = "montanha-analytics-consent";
let initialized = false;
let lastPage = "";

export function hasTrackingIds(): boolean {
  return (
    /^G-[A-Z0-9]+$/.test(siteConfig.TRACKING.GA4_ID) ||
    /^[A-Z0-9]{10,}$/i.test(siteConfig.TRACKING.TIKTOK_PIXEL_ID)
  );
}

export function readConsent(): string | null {
  try {
    return window.localStorage.getItem(consentKey);
  } catch {
    return null;
  }
}

export function trackEvent(name: AnalyticsEvent, details: EventDetails = {}): void {
  if (typeof window === "undefined") return;
  // Eventos locais permitem conectar outras ferramentas sem enviar dados a terceiros.
  window.dispatchEvent(
    new CustomEvent("montanha:analytics", { detail: { event: name, ...details } }),
  );
  if (!initialized || readConsent() !== "accepted") return;
  window.gtag?.("event", name, { ...details, transport_type: "beacon" });
  if (name === "checkout_exit")
    window.ttq?.track?.("ClickButton", { ...details, event_name: name });
}

function addScript(src: string, id: string): void {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

export function initializeTracking(): void {
  if (
    typeof window === "undefined" ||
    initialized ||
    readConsent() !== "accepted" ||
    !hasTrackingIds()
  )
    return;
  initialized = true;
  const { GA4_ID, TIKTOK_PIXEL_ID } = siteConfig.TRACKING;
  if (/^G-[A-Z0-9]+$/.test(GA4_ID)) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      // GA4 consumes the Arguments queue used by its official bootstrap.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA4_ID, { send_page_view: false });
    addScript(
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`,
      "montanha-ga4",
    );
  }
  if (/^[A-Z0-9]{10,}$/i.test(TIKTOK_PIXEL_ID)) {
    window.TiktokAnalyticsObject = "ttq";
    const queue = (window.ttq = window.ttq || ([] as unknown as TrackingQueue));
    queue.page = () => {
      queue.push(["page"]);
    };
    queue.track = (name, data) => {
      queue.push(["track", name, data]);
    };
    // Official pixel queue shape, consumed by the asynchronously loaded SDK.
    const sdkUrl = "https://analytics.tiktok.com/i18n/pixel/events.js";
    const instance = Object.assign([], { _u: sdkUrl });
    Object.assign(queue, {
      _i: { [TIKTOK_PIXEL_ID]: instance },
      _t: { [TIKTOK_PIXEL_ID]: Date.now() },
      _o: { [TIKTOK_PIXEL_ID]: {} },
    });
    addScript(`${sdkUrl}?sdkid=${encodeURIComponent(TIKTOK_PIXEL_ID)}&lib=ttq`, "montanha-tiktok");
    queue.page();
  }
  trackEvent("page_view", { page_path: window.location.pathname });
}

export function recordPageView(): void {
  const path = window.location.pathname;
  if (lastPage === path) return;
  lastPage = path;
  if (readConsent() === "accepted" && hasTrackingIds()) initializeTracking();
  else trackEvent("page_view", { page_path: path });
}

export function saveConsent(accepted: boolean): void {
  try {
    window.localStorage.setItem(consentKey, accepted ? "accepted" : "declined");
  } catch {
    /* Browser storage may be unavailable. */
  }
  if (accepted) initializeTracking();
}
