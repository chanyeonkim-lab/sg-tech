import { track as vercelTrack } from "@vercel/analytics";

type EventData = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, data?: EventData) {
  try {
    vercelTrack(name, data);
  } catch {
    // no-op
  }
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", name, data);
    }
  } catch {
    // no-op
  }
}
