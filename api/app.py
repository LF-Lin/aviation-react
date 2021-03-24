import requests
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


@app.route('/api/airport/arrivals/<string:iata>', methods=['GET'])
def realtime_airport_arrivals(iata):
    fd = FlightData()
    airport_arrivals = fd.get_airport_arrivals(iata, page=1, limit=10)
    return jsonify(airport_arrivals)


@app.route('/api/airport/departures/<string:iata>', methods=['GET'])
def realtime_airport_departures(iata):
    fd = FlightData()
    airport_departures = fd.get_airport_departures(iata, page=1, limit=10)
    return jsonify(airport_departures)


@app.route('/api/flights/<string:bounds>', methods=['GET'])
def realtime_flights(bounds):
    url = f"https://data-live.flightradar24.com/zones/fcgi/feed.js?faa=1&bounds={bounds}&callsign=CSN"
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
    response = requests.request("GET", url, headers=headers)
    
    flight_trail, row = [], {}
    for k in response.json():
        if k in ['time', 'airport', 'identification', 'airline', 'aircraft']:
            row[k] = response.json()[k]
    row['trail'] = {
        'current': response.json()['trail'][0], 
        'path': [[i['lng'],i['lat']] for i in response.json()['trail']]
    }
    flight_trail.append(row)
    
    return jsonify(flight_trail)


if __name__ == "__main__":
    app.run(debug=True, port=5555)