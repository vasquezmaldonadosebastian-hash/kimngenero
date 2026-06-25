from pathlib import Path
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError
import time


OUTPUT_DIR = Path(
    r"C:\Users\Sebastian Vasquez\Documents\GitHub\KimnGenero\outputs\presentacion_kimn_v2\capturas_indicadores_powerbi\pagina_completa_real"
)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

TARGETS = [
    {
        "url": "https://KimnGenero.onrender.com/estado-agrupado",
        "filename": "estado_agrupado_pagina_completa_real_v2.png",
    },
    {
        "url": "https://KimnGenero.onrender.com/indicador/7",
        "filename": "03CCGE-07_pagina_completa_real_v2.png",
    },
    {
        "url": "https://KimnGenero.onrender.com/indicador/8",
        "filename": "03CCGE-08_pagina_completa_real_v2.png",
    },
]


def wait_for_dashboard_frame(page):
    page.wait_for_selector("iframe", timeout=120000)
    iframe_el = page.locator("iframe").first
    iframe_el.scroll_into_view_if_needed(timeout=15000)

    frame = None
    for _ in range(60):
        handle = iframe_el.element_handle()
        if handle:
            frame = handle.content_frame()
        if frame and frame.url and frame.url != "about:blank":
            try:
                frame.wait_for_load_state("domcontentloaded", timeout=5000)
            except PlaywrightTimeoutError:
                pass
            break
        time.sleep(1)

    loaded = False
    if frame:
        for _ in range(90):
            try:
                body_text = frame.locator("body").inner_text(timeout=3000).strip()
            except Exception:
                body_text = ""
            try:
                child_count = frame.locator("body *").count()
            except Exception:
                child_count = 0
            if (
                body_text
                and "loading" not in body_text.lower()
                and "cargando" not in body_text.lower()
            ) or child_count > 25:
                loaded = True
                break
            time.sleep(1)

    return loaded, frame


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    for target in TARGETS:
        page = browser.new_page(viewport={"width": 1440, "height": 1200}, device_scale_factor=1.5)
        page.goto(target["url"], wait_until="domcontentloaded", timeout=120000)
        page.wait_for_timeout(4000)
        try:
            page.wait_for_load_state("networkidle", timeout=30000)
        except PlaywrightTimeoutError:
            pass

        loaded, frame = wait_for_dashboard_frame(page)

        # Recorremos la pagina completa para permitir carga diferida natural.
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(2500)
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(1500)

        page.wait_for_selector("footer", timeout=20000)
        out_file = OUTPUT_DIR / target["filename"]
        page.screenshot(path=str(out_file), full_page=True)

        print(f"SAVED={out_file}")
        print("LOADED=" + str(loaded))
        print("IFRAME_URL=" + (frame.url if frame else "no-frame"))
        print("PAGE_HEIGHT=" + str(page.evaluate("document.documentElement.scrollHeight")))
        print("---")
        page.close()

    browser.close()
