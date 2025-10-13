// Analytics tracking utilities for portfolio site
// Provides helper functions for tracking different types of user interactions

// Helper function to safely check if gtag is available
function isGtagAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

// Helper function for development logging
function logAnalyticsEvent(
  eventName: string,
  parameters: Record<string, unknown>
) {
  if (
    typeof window !== "undefined" &&
    window.location.hostname === "localhost"
  ) {
    console.log(`🔍 Analytics Event: ${eventName}`, parameters);
  }
}

/**
 * Track button/CTA clicks with relevant context
 */
export function trackCTAClick(
  buttonText: string,
  location: string,
  additionalData?: Record<string, string | number>
) {
  const eventData = {
    event_category: "engagement",
    event_label: buttonText,
    page_location: location,
    custom_parameters: {
      button_text: buttonText,
      page_section: location,
      ...additionalData,
    },
  };

  logAnalyticsEvent("cta_click", eventData);

  if (isGtagAvailable()) {
    try {
      window.gtag!("event", "cta_click", eventData);
    } catch (error) {
      console.warn("Analytics tracking error:", error);
    }
  }
}

/**
 * Track file downloads (resume, documents, etc.)
 */
export function trackDownload(
  fileName: string,
  fileType: string,
  downloadSource: string
) {
  const eventData = {
    event_category: "downloads",
    event_label: fileName,
    custom_parameters: {
      file_name: fileName,
      file_type: fileType,
      download_source: downloadSource,
    },
  };

  logAnalyticsEvent("file_download", eventData);

  if (isGtagAvailable()) {
    try {
      window.gtag!("event", "file_download", eventData);
    } catch (error) {
      console.warn("Analytics tracking error:", error);
    }
  }
}

/**
 * Track external link clicks
 */
export function trackExternalLink(
  linkUrl: string,
  linkText: string,
  linkType: "social" | "project" | "reference" | "other" = "other"
) {
  if (isGtagAvailable()) {
    try {
      window.gtag!("event", "click", {
        event_category: "external_links",
        event_label: linkText,
        custom_parameters: {
          link_url: linkUrl,
          link_text: linkText,
          link_type: linkType,
          outbound: true,
        },
      });
    } catch (error) {
      console.warn("Analytics tracking error:", error);
    }
  }
}

/**
 * Track internal navigation events for important flows
 */
export function trackInternalNavigation(
  fromPage: string,
  toPage: string,
  trigger: string
) {
  if (isGtagAvailable()) {
    try {
      window.gtag!("event", "page_navigation", {
        event_category: "navigation",
        event_label: `${fromPage} → ${toPage}`,
        custom_parameters: {
          from_page: fromPage,
          to_page: toPage,
          navigation_trigger: trigger,
        },
      });
    } catch (error) {
      console.warn("Analytics tracking error:", error);
    }
  }
}

/**
 * Track form interactions and submissions
 */
export function trackFormInteraction(
  formName: string,
  action: "start" | "submit" | "error",
  additionalData?: Record<string, string | number>
) {
  if (isGtagAvailable()) {
    try {
      window.gtag!("event", "form_interaction", {
        event_category: "forms",
        event_label: `${formName}_${action}`,
        custom_parameters: {
          form_name: formName,
          form_action: action,
          ...additionalData,
        },
      });
    } catch (error) {
      console.warn("Analytics tracking error:", error);
    }
  }
}

/**
 * Track project/skill detail views
 */
export function trackContentView(
  contentType: "project" | "skill" | "case_study",
  contentName: string,
  contentId?: string
) {
  if (isGtagAvailable()) {
    try {
      window.gtag!("event", "content_view", {
        event_category: "content",
        event_label: contentName,
        custom_parameters: {
          content_type: contentType,
          content_name: contentName,
          content_id: contentId || contentName,
        },
      });
    } catch (error) {
      console.warn("Analytics tracking error:", error);
    }
  }
}
