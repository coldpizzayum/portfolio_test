import { track } from "@vercel/analytics";

type EventName = "contact_click" | "linkedin_click" | "cv_download" | "case_study_click";
type EventProps = Record<string, string>;

declare global {
  interface Window {
    // Injected by the Umami script in app/layout.tsx (production only).
    umami?: { track: (name: string, data?: EventProps) => void };
  }
}

/** Sends one custom event to both Vercel Analytics and Umami. Uses
 *  Umami's JS API instead of `data-umami-event` attributes because the
 *  shared <Button> doesn't forward arbitrary data-* props. */
export function trackEvent(name: EventName, props?: EventProps) {
  track(name, props);
  window.umami?.track(name, props);
}
