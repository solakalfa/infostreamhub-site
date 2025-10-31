export default function trackPageView() {
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
    credentials: 'include',
    body: JSON.stringify(payload)
  }).catch(err => console.error('PageView tracking failed:', err));
}

// Run immediately when script loads
trackPageView();

// Listen for Astro page transitions
document.addEventListener('astro:page-load', () => {
  trackPageView();
});