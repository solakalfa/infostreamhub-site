// Auto-populate campaign data if missing
(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const hasCampaignParams = urlParams.has('campaign_id') || urlParams.has('external_ref');
  
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
})();