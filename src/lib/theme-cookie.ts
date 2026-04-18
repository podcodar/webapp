/** Cookie name — keep in sync with inline script in `BaseHead.astro`. */
export const THEME_COOKIE_NAME = 'podcodar-theme';

export type ThemePreference = 'light' | 'dark' | 'system';

function encodeCookieValue(value: string): string {
  return encodeURIComponent(value);
}

/** Read theme from `document.cookie` (client only). */
export function getThemeFromCookie(): ThemePreference {
  if (typeof document === 'undefined') return 'system';
  const raw = `; ${document.cookie}`;
  const part = raw.split(`; ${THEME_COOKIE_NAME}=`);
  if (part.length !== 2) return 'system';
  const v = part.pop()?.split(';').shift();
  if (!v) return 'system';
  const decoded = decodeURIComponent(v);
  if (decoded === 'light' || decoded === 'dark') return decoded;
  return 'system';
}

/** Persist theme. `system` clears the cookie so OS preference applies. */
export function setThemeCookie(theme: ThemePreference): void {
  if (typeof document === 'undefined') return;
  const maxAge = 60 * 60 * 24 * 365;
  const base = `path=/; max-age=${maxAge}; SameSite=Lax`;
  if (theme === 'system') {
    // biome-ignore lint/suspicious/noDocumentCookie: small cookie helper; Cookie Store API not universally available
    document.cookie = `${THEME_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
    return;
  }
  // biome-ignore lint/suspicious/noDocumentCookie: small cookie helper; Cookie Store API not universally available
  document.cookie = `${THEME_COOKIE_NAME}=${encodeCookieValue(theme)}; ${base}`;
}

/** Apply daisyUI theme on `<html>` and sync the cookie. */
export function applyThemePreference(theme: ThemePreference): void {
  const root = document.documentElement;
  if (theme === 'system') {
    setThemeCookie('system');
    const resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.setAttribute('data-theme', resolved);
    return;
  }
  setThemeCookie(theme);
  root.setAttribute('data-theme', theme);
}
