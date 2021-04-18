import requests
import json

def get_flights_in_bounds():
    bounds = ['53.97%2C17.71%2C72.75%2C88.75','53.97%2C17.71%2C88.75%2C104.75','53.97%2C17.71%2C104.75%2C120.75','53.97%2C17.71%2C120.75%2C135.14']
    flights_info = {}

    for bound in bounds:
        url = f"https://data-live.flightradar24.com/zones/fcgi/feed.js?faa=1&bounds={bound}"
        headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
            "accept": "application/json",
            "accept-language": "en-EN",
            "cache-control": "max-age=0",
            "origin": "https://www.flightradar24.com",
            "referer": "https://www.flightradar24.com/"
        }
        response = requests.request("GET", url, headers=headers)
        flights = response.json()
        for k, v in flights.items():
            if k == 'full_count' or k == 'version': continue
            row = {
                'latitude': v[1],
                'longitude': v[2],
                'angle': v[3],
                'altitude': v[4],
                'speed': v[5]
            }
            flights_info[k] = row

    flights_in_bounds = []
    for k, v in flights_info.items():
        flights_in_bounds.append(v)

    with open('./flights_in_bounds_04181509.json', 'w', encoding='utf-8') as f:
        json.dump(flights_in_bounds, f, ensure_ascii=False)

if __name__ == '__main__':
    get_flights_in_bounds()