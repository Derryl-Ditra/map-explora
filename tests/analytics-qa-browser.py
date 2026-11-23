"""Browser regression for the analytics QA gate, across browser engines.
Requires: pip install playwright && python -m playwright install
Run against a built/served app: MAP_URL=http://127.0.0.1:3000/map-explora/ python tests/analytics-qa-browser.py
Engines default to chromium, firefox and webkit; MAP_BROWSERS=chromium limits the set.
Asserts that QA mode (?qa=1), the persisted QA flag, and GoatCounter's own
opt-out flag produce ZERO count requests, while a normal visit loads the counter.
"""
import os
from playwright.sync_api import sync_playwright

URL = os.environ.get('MAP_URL', 'http://127.0.0.1:3000/map-explora/')
GC_MARKERS = ('gc.zgo.at', 'goatcounter.com/count')

def count_requests(page):
    hits = []
    page.on('request', lambda req: hits.append(req.url) if any(m in req.url for m in GC_MARKERS) else None)
    return hits

ENGINES = [e.strip() for e in os.environ.get('MAP_BROWSERS', 'chromium,firefox,webkit').split(',') if e.strip()]
with sync_playwright() as p:
    for engine in ENGINES:
        browser = getattr(p, engine).launch()

        # 1. QA mode via URL param: no count request, and the flag persists to a clean URL.
        page = browser.new_page()
        hits = count_requests(page)
        page.goto(URL + '?qa=1', wait_until='networkidle')
        assert hits == [], f'QA param still hit GoatCounter: {hits}'
        page.goto(URL, wait_until='networkidle')
        assert hits == [], f'persisted QA flag still hit GoatCounter: {hits}'
        assert page.evaluate('localStorage.getItem("map-explora-qa")') == '1'
        page.close()

        # 2. Stored QA flag alone (no URL param): no count request; qa=0 re-enables.
        ctx = browser.new_context()
        page = ctx.new_page()
        page.goto(URL + '404', wait_until='commit')  # same-origin page to set storage
        page.evaluate('localStorage.setItem("map-explora-qa", "1")')
        hits = count_requests(page)
        page.goto(URL, wait_until='networkidle')
        assert hits == [], f'stored QA flag still hit GoatCounter: {hits}'
        page.goto(URL + '?qa=0', wait_until='networkidle')
        assert page.evaluate('localStorage.getItem("map-explora-qa")') is None
        assert any('count.js' in h for h in hits), f'qa=0 did not restore analytics: {hits}'
        page.close()
        ctx.close()

        # 3. GoatCounter's own opt-out flag: no count request at all.
        ctx = browser.new_context()
        page = ctx.new_page()
        page.goto(URL + '404', wait_until='commit')
        page.evaluate('localStorage.setItem("skipgc", "t")')
        hits = count_requests(page)
        page.goto(URL, wait_until='networkidle')
        assert hits == [], f'GoatCounter opt-out flag still hit GoatCounter: {hits}'
        page.close()
        ctx.close()

        # 4. Normal visit: the counter loads exactly once.
        page = browser.new_page()
        hits = count_requests(page)
        page.goto(URL, wait_until='networkidle')
        assert len([h for h in hits if 'count.js' in h]) == 1, f'normal visit counter loads: {hits}'
        page.close()

        browser.close()
print('analytics QA gate: all browser checks passed on ' + ', '.join(ENGINES))
