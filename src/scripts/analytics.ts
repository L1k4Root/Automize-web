export type AnalyticsProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: AnalyticsProps }) => void;
    gtag?: (command: string, eventName: string, props?: AnalyticsProps) => void;
  }
}

export const track = (eventName: string, props: AnalyticsProps = {}) => {
  window.dispatchEvent(
    new CustomEvent("automize:analytics", {
      detail: { eventName, props },
    }),
  );

  if (typeof window.plausible === "function") {
    window.plausible(eventName, { props });
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, props);
  }
};
