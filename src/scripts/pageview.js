export default function trackPageView() {
  if (window.location.pathname.startsWith('/articles/')) {
    const params = new URLSearchParams(window.location.search);
    const clickId = params.get('click_id') || params.get('fbclid');

    // Build payload - only include click_id if it exists
    const payload = {
      url: window.location.href,
      referrer: document.referrer,
      user_agent: navigator.userAgent
    };
    
    if (clickId) {
      payload.click_id = clickId;
    }

    fetch(`${import.meta.env.PUBLIC_API_BASE}/api/v1/events/pageview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(err => console.error('PageView tracking failed:', err));
  }
}