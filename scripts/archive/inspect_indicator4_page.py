from pathlib import Path
from playwright.sync_api import sync_playwright
url = 'https://KimnGenero.onrender.com/indicador/02VGGE-04'
out = Path('outputs/brief_diseno_docs/inspect_indicator4_page.txt')
out.parent.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 1200})
    page.goto(url, wait_until='load', timeout=120000)
    page.wait_for_timeout(8000)
    text = page.locator('body').inner_text()[:8000]
    out.write_text('TITLE=' + page.title() + '\nURL=' + page.url + '\n\n' + text, encoding='utf-8')
    print(str(out.resolve()))
    browser.close()
