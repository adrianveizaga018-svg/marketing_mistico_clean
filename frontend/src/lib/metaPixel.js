// Meta Pixel Configuration and Utilities

class MetaPixel {
  constructor(pixelId) {
    this.pixelId = pixelId;
    this.initialized = false;
  }

  // Initialize Meta Pixel
  init() {
    if (this.initialized || !this.pixelId) return;

    // Facebook Pixel Code
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', this.pixelId);
    window.fbq('track', 'PageView');

    this.initialized = true;
    console.log('✅ Meta Pixel initialized:', this.pixelId);
  }

  // Track standard events
  trackEvent(eventName, parameters = {}) {
    if (!this.initialized || !window.fbq) {
      console.warn('Meta Pixel not initialized');
      return;
    }

    window.fbq('track', eventName, parameters);
    console.log(`📊 Meta Pixel Event: ${eventName}`, parameters);
  }

  // Track custom events
  trackCustomEvent(eventName, parameters = {}) {
    if (!this.initialized || !window.fbq) {
      console.warn('Meta Pixel not initialized');
      return;
    }

    window.fbq('trackCustom', eventName, parameters);
    console.log(`📊 Meta Pixel Custom Event: ${eventName}`, parameters);
  }

  // Standard Events Helper Methods
  trackViewContent(contentName, contentCategory = '', value = 0) {
    this.trackEvent('ViewContent', {
      content_name: contentName,
      content_category: contentCategory,
      value: value,
      currency: 'USD'
    });
  }

  trackLead(value = 0) {
    this.trackEvent('Lead', {
      value: value,
      currency: 'USD'
    });
  }

  trackContact() {
    this.trackEvent('Contact');
  }

  trackInitiateCheckout(service = '', value = 0) {
    this.trackEvent('InitiateCheckout', {
      content_name: service,
      value: value,
      currency: 'USD'
    });
  }

  trackSchedule() {
    this.trackCustomEvent('Schedule', {
      event_category: 'Engagement',
      event_label: 'Scheduled Consultation'
    });
  }

  trackWhatsAppClick() {
    this.trackCustomEvent('WhatsAppClick', {
      event_category: 'Communication',
      event_label: 'WhatsApp Button Click'
    });
  }

  trackPortfolioView(projectName) {
    this.trackCustomEvent('PortfolioView', {
      content_name: projectName,
      event_category: 'Engagement'
    });
  }

  trackFAQInteraction(question) {
    this.trackCustomEvent('FAQInteraction', {
      content_name: question,
      event_category: 'Engagement'
    });
  }
}

// Export singleton instance
// NOTE: Replace 'YOUR_PIXEL_ID' with your actual Meta Pixel ID
const PIXEL_ID = process.env.REACT_APP_META_PIXEL_ID || 'YOUR_PIXEL_ID';
const metaPixel = new MetaPixel(PIXEL_ID);

export default metaPixel;
