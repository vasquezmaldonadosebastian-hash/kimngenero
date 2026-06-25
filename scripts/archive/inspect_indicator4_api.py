from urllib.request import urlopen
from pathlib import Path
url = 'https://KimnGenero.onrender.com/api/indicadores/02VGGE-04'
out = Path('outputs/brief_diseno_docs/inspect_indicator4_api.txt')
with urlopen(url, timeout=60) as resp:
    data = resp.read().decode('utf-8', errors='replace')
out.write_text(data, encoding='utf-8')
print(str(out.resolve()))
