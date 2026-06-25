from urllib.request import urlopen
import json
url = 'https://KimnGenero.onrender.com/api/indicadores/4'
with urlopen(url, timeout=60) as resp:
    data = json.loads(resp.read().decode('utf-8', errors='replace'))
print(data.get('id'), data.get('codigo'), data.get('titulo'))
print(data.get('iframeSrc','')[:200])
