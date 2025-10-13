import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Sends a GA4 page_view event whenever the route changes.
 */
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Make sure GA4 is loaded
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);
}
