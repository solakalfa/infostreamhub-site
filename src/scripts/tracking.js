// Auto-populate campaign data if missing
(async function() {
  const urlParams = new URLSearchParams(window.location.search);
  const hasCampaignParams = urlParams.has('campaign_id') || urlParams.has('external_ref');
  
  // Check for UTM parameters (Facebook Ads / Tarzo)
  const hasUtmParams = urlParams.has('utm_source') || urlParams.has('campaign_id');
  
  if (!hasCampaignParams) {
    // Get default campaign data
    const referrer = document.referrer;
    let campaign_id = 'direct';
    let external_ref = 'none';
    
    if (referrer && referrer !== '') {
      try {
        const refUrl = new URL(referrer);
        campaign_id = 'organic';
        external_ref = refUrl.hostname;
      } catch (e) {
        // keep defaults
      }
    }
    
    // Store in sessionStorage for analytics
    sessionStorage.setItem('pn_campaign_id', campaign_id);
    sessionStorage.setItem('pn_external_ref', external_ref);
    
    console.log('[PN Tracking] Auto campaign:', { campaign_id, external_ref });
  } else {
    // Store provided params
    if (urlParams.get('campaign_id')) {
      sessionStorage.setItem('pn_campaign_id', urlParams.get('campaign_id'));
    }
    if (urlParams.get('external_ref')) {
      sessionStorage.setItem('pn_external_ref', urlParams.get('external_ref'));
    }
    
    console.log('[PN Tracking] Campaign params:', {
      campaign_id: urlParams.get('campaign_id'),
      external_ref: urlParams.get('external_ref')
    });
  }
  
  // 🆕 NEW: Send click event to backend if UTM params exist
  if (hasUtmParams) {
    // Generate or extract click_id
    const clickId = urlParams.get('click_id') || urlParams.get('fbclid') || `fb.1.${Date.now()}.${Math.random().toString(36).substring(2, 11)}`;
    
    const payload = {
      click_id: clickId,
      utm_source: urlParams.get('utm_source') || 'fb',
      account_id: urlParams.get('account_id') || 'default_account',
      campaign_id: urlParams.get('campaign_id') || 'unknown',
      adset_id: urlParams.get('adset_id') || 'default_adset',
      ad_id: urlParams.get('ad_id') || 'default_ad',
      source: urlParams.get('source') || 'facebook',
      Adtext: urlParams.get('Adtext') || 'default',
      ad_terms: urlParams.get('ad_terms') ? urlParams.get('ad_terms').split(',') : []
    };
    
    try {
      const apiBase = import.meta.env.PUBLIC_API_BASE || 'http://localhost:8081';
      const response = await fetch(`${apiBase}/api/v1/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',  // ← חדש!
        body: JSON.stringify({ payload })
      });
      
      const result = await response.json();
      console.log('[PN Tracking] Click event sent:', result);
    } catch (err) {
      console.error('[PN Tracking] Failed to send click event:', err);
    }
  }
})();