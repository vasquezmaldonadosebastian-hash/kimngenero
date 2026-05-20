from urllib.request import urlopen
import json
url = 'https://KimnGenero.onrender.com/api/indicadores'
with urlopen(url, timeout=60) as resp:
    data = json.loads(resp.read().decode('utf-8', errors='replace'))
for item in data:
    code = str(item.get('codigo',''))
    title = str(item.get('titulo',''))
    if '04' in code or code.endswith('4'):
        print(item.get('id'), '|', code, '|', title)
