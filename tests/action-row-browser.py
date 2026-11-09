"""Browser regression for the detail action row. Requires pip install playwright.
Run against a built/served app: MAP_URL=http://127.0.0.1:3000/map-explora/ python tests/action-row-browser.py
"""
import os
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

URL = os.environ.get('MAP_URL', 'http://127.0.0.1:3000/map-explora/')
SHOTS = Path(os.environ.get('MAP_SHOTS', '/tmp/action-row-shots'))
SHOTS.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch()
    for width in [320, 375, 393, 768, 1024, 1440, 1920]:
        page = browser.new_page(viewport={'width': width, 'height': 852 if width < 768 else 1000})
        page.goto(URL + '?venue=rockstar-academy-aeon-mall-sentul-city', wait_until='networkidle')
        actions = page.get_by_role('navigation', name='Place actions')
        expect(actions).to_be_visible()
        expect(actions.get_by_role('button', name='Share', exact=True)).to_be_visible()
        expect(page.get_by_role('button', name='Share', exact=True)).to_have_count(1)
        back = actions.get_by_role('button', name='Back to map', exact=True)
        expect(back).to_be_visible()
        directions = actions.get_by_role('link')
        assert 'google.com/maps' in directions.get_attribute('href')
        boxes = [back.bounding_box(), directions.bounding_box(), actions.get_by_role('button', name='Share', exact=True).bounding_box()]
        assert all(b['height'] >= 44 and b['width'] >= 44 for b in boxes), boxes
        assert max(b['y'] for b in boxes) - min(b['y'] for b in boxes) < 2, boxes
        assert boxes[0]['x'] + boxes[0]['width'] <= boxes[1]['x'], boxes
        assert boxes[1]['x'] + boxes[1]['width'] <= boxes[2]['x'], boxes
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        page.screenshot(path=str(SHOTS / f'{width}.png'))
        actions.get_by_role('button', name='Share', exact=True).click()
        expect(page.get_by_role('dialog')).to_be_visible()
        page.get_by_role('button', name='Close share').click()
        expect(actions).to_be_visible()
        back.click()
        expect(actions).not_to_be_visible()
        assert 'v=' not in page.url, page.url
        # List-origin details must also return to the plain map, not the list.
        if width < 768:
            page.get_by_role('button', name='List ·', exact=False).click()
        page.get_by_role('textbox', name='Search class, brand, area, or street').fill('AEON MALL Sentul')
        page.get_by_role('button', name='Rockstar Academy AEON MALL Sentul City', exact=False).first.click()
        expect(actions).to_be_visible()
        actions.get_by_role('button', name='Back to map', exact=True).click()
        expect(actions).not_to_be_visible()
        if width < 768:
            expect(page.get_by_role('button', name='List ·', exact=False)).to_be_visible()
        page.close()
        print(f'PASS {width}px: action row, touch targets, share, direct/list Back to map')
    browser.close()
