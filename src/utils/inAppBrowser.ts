// Best-effort hints only: user agents can change or conceal the host app.
export function isInAppBrowser(ua: string) {
 return /Instagram|Threads|Barcelona|FBAN|FBAV|\bwv\b/i.test(ua);
}
export function locationLanguage(params: URLSearchParams,documentLang: string): 'id'|'en' {
 const origin=params.get('shareLang');
 return origin==='id'||origin==='en'?origin:documentLang==='id'?'id':'en';
}
export function chromeIntent(href: string): string|null {
 const u=new URL(href);
 // Only reopen this site's HTTPS page. No arbitrary scheme or intent extras.
 if(u.protocol!=='https:'||u.hostname!=='derryl-ditra.github.io'||!u.pathname.startsWith('/map-explora'))return null;
 return `intent://${u.host}${u.pathname}${u.search}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(u.href)};end;`;
}
