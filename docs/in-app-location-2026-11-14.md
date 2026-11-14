# Denied location in an in-app browser

14 November 2026. Draft only. Separate from the sharing-button draft.

## Answer

Embedded browsers can support geolocation on Android and iOS, but host-app configuration and app/origin permissions determine whether a page gets access. There is no verified Meta version-by-version support matrix here. The user's real Android Threads test showed location denied while Directions and Share worked. Do not describe all in-app browsers as incapable of location.

## Small recovery change

Only the denied-location path changes. Keep the map and list usable, do not automatically request location again, and keep the recovery notice visible until dismissed. A best-effort user-agent hint recognizes Threads/Instagram/Meta tokens or Android WebView; it is not guaranteed host identification. When recognized, explain that the in-app browser may limit location and offer:

- Copy the current website URL, retaining selected place and language query parameters. If clipboard access fails, show a selectable URL field.
- Manual app-menu instruction: often three dots, choose open in browser if available, otherwise paste into Chrome or Safari.
- Android only: a user-tapped Try Chrome intent, with the original HTTPS page as fallback. Meta support is not guaranteed; the copy/manual route remains visible. No automatic redirect or private Safari URL scheme.

The denial notice uses the source-page shareLang hint when present, otherwise document language. This does not translate the whole map. Normal-browser denial also has a copy route; no misleading in-app claim. Timeouts/unavailable errors keep existing behavior. Directions and Share are unchanged.

## Sources read

1. Android Developers, WebChromeClient, official API reference: the host handles onGeolocationPermissionsShowPrompt and chooses permission state. Modern targets require secure origins.
https://developer.android.com/reference/android/webkit/WebChromeClient

2. Android Developers, GeolocationPermissions, official API reference: permission is stored per origin and can be allowed or denied.
https://developer.android.com/reference/android/webkit/GeolocationPermissions

3. WebKit source, WKGeolocationProviderIOS.mm, primary implementation: app/CoreLocation authorization followed by page authorization; a host can disable geolocation. This is upstream implementation evidence, not proof of any Meta build's configuration.
https://github.com/WebKit/WebKit/blob/main/Source/WebKit/UIProcess/ios/WKGeolocationProviderIOS.mm

4. Chrome for Developers, Android Intents, official documentation: intent URI syntax, package and encoded browser fallback; user activation required. This describes Chrome, not a Meta guarantee.
https://developer.chrome.com/docs/android/intents

5. MDN Navigator.share, API reference: capability varies, HTTPS, permissions policy and transient user activation apply. The host/device controls share targets.
https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share

6. MDN Clipboard.writeText, API reference: HTTPS and permission restrictions; failure must not leave a dead-end copy button.
https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText

7. MDN GeolocationPositionError.code, API reference: code1 is permission denied, code2 unavailable, code3 timeout.
https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError/code

8. OpenOut, 22 October 2026, commercial guide/user-report synthesis: menu/manual-copy route, explicitly no Meta documentation found; menu wording varies. Secondary evidence only.
https://openout.app/blog/how-to-open-threads-links-in-your-browser

9. Pochuto, vendor's five-phone experiment dated20 July2026: Meta iOS automatic exits blocked, manual menu worked; some Android intent exits worked. Self-reported small sample, not independently reproduced and not a platform guarantee.
https://pochuto.com/en/posts/open-link-outside-in-app-browser-iphone

Apple's requestGeolocationPermission API page was reachable but gave little readable detail. No claim about its supported OS versions is used.
https://developer.apple.com/documentation/webkit/wkuidelegate/webview(_:requestgeolocationpermissionfor:initiatedbyframe:decisionhandler:)

## Directions and Share

Existing Directions is a normal Google Maps HTTPS URL without origin, so it does not depend on this site's geolocation fix. Native app vs web handoff remains device/host-controlled. The user confirmed Directions and Share work in his real Android Threads instance. This draft does not change either. No real Threads/Instagram iOS handoff test was available.

## Validation and limits

181 tests, lint and static build pass. Four390px browser simulations cover Android Threads-like WebView and iOS Instagram-like user agents, each in English and Indonesian. Tests inject permission denial, verify recovery persists beyond5seconds, exercise clipboard success/failure, selectable URL, dismissal and continued list browsing. Android-only intent presence checked; it was not executed on a physical phone. User-agent tests are not native app certification. No location permission bypass, no coordinates from IP, no automatic navigation or repeated permission polling.
