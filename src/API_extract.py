import urllib3

medals_url = "https://data.lacity.org/resource/e7h6-4a3e.csv"
http = urllib3.PoolManager()
r = http.request("GET", medals_url)
r.status

data = "".join(map(chr,r.data))
print(data)
data = data.split('\n')
for row in data:
    print(row) # or print(row.split(','))