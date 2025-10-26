/**
 * Build campaign URL with tracking parameters
 * @param {string} slug - Article slug
 * @param {Object} metadata - Campaign metadata
 * @returns {string} Full URL with parameters
 */
export function buildCampaignUrl(slug, metadata = {}) {
  const baseUrl = `${import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321'}/articles/${slug}`;
  
  const { campaign_id, external_ref } = metadata;
  
  // If no campaign params, return canonical URL
  if (!campaign_id && !external_ref) {
    return baseUrl;
  }
  
  const params = new URLSearchParams();
  if (campaign_id) params.append('campaign_id', campaign_id);
  if (external_ref) params.append('external_ref', external_ref);
  
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Get default campaign data from referrer
 * @param {string} referrer - document.referrer
 * @returns {Object} Default campaign metadata
 */
export function getDefaultCampaignData(referrer = '') {
  if (!referrer || referrer === '') {
    return {
      campaign_id: 'direct',
      external_ref: 'none'
    };
  }
  
  try {
    const url = new URL(referrer);
    return {
      campaign_id: 'organic',
      external_ref: url.hostname
    };
  } catch {
    return {
      campaign_id: 'direct',
      external_ref: 'none'
    };
  }
}