"""390px real-touch regression. Requires Python playwright and Chrome.
Run: python scripts/check-sheet-touch.py --url http://localhost:3000/
Use --screens /downloads/path-prefix to capture repeated-cycle evidence.
"""
import argparse
from playwright.sync_api import sync_playwright
parser = argparse.ArgumentParser()
parser.add_argument('--url', required=True)
parser.add_argument('--screens')
args = parser.parse_args()
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/google-chrome', headless=True, args=['--no-sandbox'])
    context = browser.new_context(viewport={'width': 390, 'height': 844}, is_mobile=True, has_touch=True)
    page = context.new_page()
    page.goto(args.url, wait_until='networkidle')
    cdp = context.new_cdp_session(page)
    def gesture(x, y, dx=0, dy=210, cancel=False):
        cdp.send('Input.dispatchTouchEvent', {'type': 'touchStart', 'touchPoints': [{'x': x, 'y': y}]})
        for fraction in [.05, .16, .33, .52, .76, 1]:
            cdp.send('Input.dispatchTouchEvent', {'type': 'touchMove', 'touchPoints': [{'x': x+dx*fraction, 'y': y+dy*fraction}]})
            page.wait_for_timeout(35)  # Real gesture velocity, not page readiness.
        cdp.send('Input.dispatchTouchEvent', {'type': 'touchCancel' if cancel else 'touchEnd', 'touchPoints': []})
    def open_list():
        page.get_by_role('button', name='List ·', exact=False).tap()
        page.get_by_role('button', name='Close list and return to map').wait_for(state='visible', timeout=2000)
    def dismiss(detail=False, content=False):
        grip = page.get_by_role('button', name='Close place and return to map' if detail else 'Close list and return to map')
        box = grip.bounding_box()
        x,y = (5, 220) if content else (box['x']+box['width']/2, box['y']+box['height']/2)
        gesture(x,y)
        grip.wait_for(state='hidden', timeout=2000)
        page.wait_for_timeout(350)  # Reopen inside the post-swipe click-suppression window.
    for i in range(6):
        open_list()
        if args.screens and i in [0,5]: page.screenshot(path=f'{args.screens}-list-{i+1}.png')
        dismiss()
        if args.screens and i in [0,5]: page.screenshot(path=f'{args.screens}-map-{i+1}.png')
    for i in range(6):
        open_list()
        page.locator('aside button').filter(has_text='Bloom Space Kota Wisata').tap()
        page.get_by_role('button', name='Close place and return to map').wait_for()
        dismiss(detail=True)
    for i in range(6):
        open_list()
        page.get_by_role('button', name='Map', exact=True).tap()
        page.get_by_role('button', name='Close list and return to map').wait_for(state='hidden')
        open_list()
        dismiss(content=True)
    # Do not turn a drag on the List button into a tap.
    box=page.get_by_role('button', name='List ·', exact=False).bounding_box()
    gesture(box['x']+box['width']/2, box['y']+box['height']/2, dx=100, dy=0)
    assert not page.get_by_role('button', name='Close list and return to map').is_visible()
    # Preserve horizontal/cancelled drags and normal handle tap dismissal.
    open_list()
    grip=page.get_by_role('button', name='Close list and return to map')
    box=grip.bounding_box();x=box['x']+box['width']/2;y=box['y']+box['height']/2
    gesture(x,y,dx=100,dy=5);assert grip.is_visible()
    gesture(x,y,cancel=True);assert grip.is_visible()
    grip.tap();grip.wait_for(state='hidden')
    print('PASS: 6 quick handle cycles, 6 detail cycles, 6 Map/content cycles; drag/cancel/tap guards')
    browser.close()
