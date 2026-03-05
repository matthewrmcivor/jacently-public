/**
 * CORS Proxy utilities for development
 * 
 * Note: CORS proxies should only be used in development.
 * For production, use a backend proxy server.
 */

/**
 * Check if an error is a CORS error
 */
export function isCorsError(error: any): boolean {
  if (error instanceof TypeError) {
    return error.message.includes('CORS') || 
           error.message.includes('Failed to fetch') ||
           error.message.includes('NetworkError');
  }
  return false;
}

/**
 * Get CORS proxy URL (for development only)
 * 
 * Options:
 * 1. Public CORS proxies (use with caution - not recommended for production)
 * 2. Your own backend proxy (recommended)
 * 3. Vite proxy configuration (best for development)
 */
export function getCorsProxyUrl(url: string, useProxy: boolean = false): string {
  if (!useProxy) {
    return url;
  }

  // Option 1: Use a public CORS proxy (development only - unreliable)
  // WARNING: These are public services and may be slow/unreliable
  // For production, you MUST use your own backend proxy
  const proxyUrl = import.meta.env.VITE_CORS_PROXY_URL || 'https://corsproxy.io/?';
  
  return `${proxyUrl}${encodeURIComponent(url)}`;
}

/**
 * Fetch with CORS error handling
 */
export async function fetchWithCorsHandling(
  url: string,
  options: RequestInit = {},
  useCorsProxy: boolean = false
): Promise<Response> {
  try {
    const targetUrl = useCorsProxy ? getCorsProxyUrl(url, true) : url;
    const response = await fetch(targetUrl, options);
    return response;
  } catch (error) {
    if (isCorsError(error)) {
      console.warn(`CORS error fetching ${url}. Consider using a backend proxy or Vite proxy configuration.`);
      throw new Error(`CORS error: Unable to fetch from ${url}. This API does not allow cross-origin requests from the browser.`);
    }
    throw error;
  }
}


