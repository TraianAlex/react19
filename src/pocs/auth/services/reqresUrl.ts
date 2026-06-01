const REQRES_ORIGIN = 'https://reqres.in';

export const reqresApiBase = import.meta.env.DEV
  ? '/reqres/api'
  : `${REQRES_ORIGIN}/api`;

/** Same-origin URL in dev so CORP on reqres assets does not block <img>. */
export function toReqresDevUrl(url: string): string {
  if (!import.meta.env.DEV) return url;
  if (url.startsWith('/reqres/')) return url;
  if (url.startsWith(REQRES_ORIGIN)) {
    return url.replace(REQRES_ORIGIN, '/reqres');
  }
  return url;
}
