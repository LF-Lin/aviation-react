import requests
import json
from datetime import datetime
from flask import Flask, jsonify
from flask_cors import CORS
from pyflightdata import FlightData


app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def index():
    return {
        'msg': 'Hello World'
    }


@app.route('/api/airport/weather/<string:iata>', methods=['GET'])
def realtime_airport_weather(iata):
    fd = FlightData()
    airport_weather = fd.get_airport_weather(iata)
    return jsonify(airport_weather)


@app.route('/api/airport/flights/<string:iata>', methods=['GET'])
def realtime_airport_arrivals(iata):
    fd = FlightData()
    airport_arrivals = fd.get_airport_arrivals(iata, page=1, limit=10)
    airport_departures = fd.get_airport_departures(iata, page=1, limit=10)
    airport_flights = airport_arrivals + airport_departures
    return jsonify(airport_flights)


@app.route('/api/flights/<string:bounds>/<string:airlines>', methods=['GET'])
def realtime_flights(bounds, airlines):
    url = f"https://data-live.flightradar24.com/zones/fcgi/feed.js?faa=1&bounds={bounds}&callsign={airlines}"
    headers = {
        "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
        "accept": "application/json",
        "accept-language": "en-EN",
        "cache-control": "max-age=0",
        "origin": "https://www.flightradar24.com",
        "referer": "https://www.flightradar24.com/"
    }
    response = requests.request("GET", url, headers=headers)
    flights_state = []
    for k, v in response.json().items():
        if k == 'full_count' or k == 'version':
            continue
        row = {
            'latitude': v[1],
            'longitude': v[2],
            'angle': v[3],
            'airport_dep': v[-8],
            'airport_arr': v[-7],
            'callsign': v[-6],
            'airline': v[-1],
            'flight_id': k
        }
        flights_state.append(row)

    return jsonify(flights_state)


@app.route('/api/flight/<string:flight_id>')
def realtime_flight_track(flight_id):
    url = f"https://data-live.flightradar24.com/clickhandler/?version=1.5&flight={flight_id}"
    headers = {
        "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
        "accept": "application/json",
        "accept-language": "en-EN",
        "cache-control": "max-age=0",
        "origin": "https://www.flightradar24.com",
        "referer": "https://www.flightradar24.com/"
    }
    r = requests.request("GET", url, headers=headers).json()
    
    flight_trail, row = [], {}
    for k in r:
        if k in ['time', 'airport', 'identification', 'airline', 'aircraft']:
            row[k] = r[k]
    row['time'] = {
        'scheduled_arr': datetime.fromtimestamp(r['time']['scheduled']['arrival']).strftime('%H:%M'),
        'scheduled_dep': datetime.fromtimestamp(r['time']['scheduled']['departure']).strftime('%H:%M'),
        'estimated_arr': datetime.fromtimestamp(r['time']['estimated']['arrival']).strftime('%H:%M'),
        'real_dep': datetime.fromtimestamp(r['time']['real']['departure']).strftime('%H:%M'),
        'progress': round((r['trail'][0]['ts'] - r['time']['real']['departure']) / (r['time']['estimated']['arrival'] - r['time']['real']['departure']), 3)*100
    }
    row['trail'] = {
        'current': r['trail'][0], 
        'path': [[i['lng'],i['lat']] for i in r['trail']]
    }
    flight_trail.append(row)
    
    return jsonify(flight_trail)


@app.route('/api/chart/networks')
def networks_data():
    with open('./scripts/networks_data_0405_new.json', 'r', encoding='utf-8') as f:
        networks = json.load(f)
    return jsonify(networks)


@app.route('/api/chart/networks/stat')
def networks_stat_data():
    with open('./scripts/networks_data_0405_stat.json', 'r', encoding='utf-8') as f:
        networks_stat = json.load(f)
    return jsonify(networks_stat)


@app.route('/api/chart/airspace_geo')
def airspace_geo_data():
    with open('./scripts/airspace.json', 'r', encoding='utf-8') as f:
        airspace_geo = json.load(f)
    return jsonify(airspace_geo)


@app.route('/api/chart/airspace_stat')
def airspace_stat_data():
    with open('./scripts/flights_in_airspace.json', 'r', encoding='utf-8') as f:
        airspace_stat = json.load(f)
    return jsonify(airspace_stat)


if __name__ == "__main__":
    app.run(debug=True, port=5555)