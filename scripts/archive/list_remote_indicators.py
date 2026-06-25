from urllib.request import urlopen
import json
url = 'https://KimnGenero.onrender.com/api/indicadores'
with urlopen(url, timeout=60) as resp:
    data = json.loads(resp.read().decode('utf-8', errors='replace'))
print('COUNT=' + str(len(data)))
for item in data[:10]:
    print(item.get('id'), '|', item.get('codigo'), '|', item.get('titulo'))
