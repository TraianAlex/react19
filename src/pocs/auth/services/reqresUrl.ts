const REQRES_ORIGIN = 'https://reqres.in';
const REQRES_PROXY_PREFIX = '/reqres';

/** Same-origin path; proxied to reqres.in in dev, preview, and Netlify. */
export const reqresApiBase = `${REQRES_PROXY_PREFIX}/api`;

/** Rewrites absolute reqres URLs so CORP does not block <img> cross-origin. */
export function toReqresProxyUrl(url: string): string {
  if (url.startsWith(`${REQRES_PROXY_PREFIX}/`)) return url;
  if (url.startsWith(REQRES_ORIGIN)) {
    return url.replace(REQRES_ORIGIN, REQRES_PROXY_PREFIX);
  }
  return url;
}
