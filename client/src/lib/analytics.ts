// Google Analytics 4 - Event Tracking Utilities
// GA4 Measurement ID: G-PGN2C39W72

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Check if analytics is available and consent was given
const isAnalyticsReady = (): boolean => {
  return typeof window !== 'undefined' &&
         typeof window.gtag === 'function' &&
         localStorage.getItem('cookie-consent') === 'accepted';
};

// Generic event tracking
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, string | number | boolean>
): void => {
  if (!isAnalyticsReady()) return;
  window.gtag('event', eventName, parameters);
};

// Track download button clicks
export const trackDownload = (appName: string, url: string): void => {
  trackEvent('download_click', {
    app_name: appName,
    download_url: url,
    event_category: 'Downloads'
  });
};

// Track social link clicks
export const trackSocialClick = (platform: string, url: string): void => {
  trackEvent('social_click', {
    platform: platform,
    link_url: url,
    event_category: 'Social'
  });
};

// Track CTA button clicks
export const trackCTAClick = (buttonName: string, section: string): void => {
  trackEvent('cta_click', {
    button_name: buttonName,
    section: section,
    event_category: 'CTA'
  });
};

// Track form submission
export const trackFormSubmit = (formName: string, success: boolean): void => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
    event_category: 'Forms'
  });
};

// Track gallery interaction
export const trackGalleryView = (): void => {
  trackEvent('gallery_view', {
    event_category: 'Engagement'
  });
};

// Track page sections viewed (for scroll tracking)
export const trackSectionView = (sectionId: string): void => {
  trackEvent('section_view', {
    section_id: sectionId,
    event_category: 'Navigation'
  });
};

// Track external link clicks
export const trackExternalLink = (linkName: string, url: string): void => {
  trackEvent('external_link_click', {
    link_name: linkName,
    link_url: url,
    event_category: 'Outbound'
  });
};

// Initialize GA4 (called after consent)
export const initializeAnalytics = (): void => {
  if (typeof window === 'undefined') return;

  // Check if already initialized
  if (document.querySelector('script[src*="googletagmanager.com/gtag"]')) return;

  // Initialize dataLayer and gtag FIRST (before script loads)
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer.push(arguments);
  };

  // Queue initial commands before script loads
  window.gtag('js', new Date());
  window.gtag('config', 'G-PGN2C39W72', {
    anonymize_ip: true, // GDPR compliance
    cookie_flags: 'SameSite=None;Secure',
    send_page_view: true
  });

  // Load gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-PGN2C39W72';
  document.head.appendChild(script);
};
