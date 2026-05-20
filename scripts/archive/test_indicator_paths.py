from playwright.sync_api import sync_playwright
for slug in ['4','02VGGE-04']:
    url = f'https://KimnGenero.onrender.com/indicador/{slug}'
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1440, 'height': 1200})
        page.goto(url, wait_until='load', timeout=120000)
        page.wait_for_timeout(5000)
        text = page.locator('body').inner_text()[:500]
        print('URL', url)
        print(text)
        browser.close()
