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

@app.route('/api/airportPEK', methods=['GET'])
def realtime_airport():
    fd = FlightData()
    iata = 'PEK'
    # airport_arrivals = fd.get_airport_arrivals(iata)
    # airport_departures = fd.get_airport_departures(iata)
    airport_weather = fd.get_airport_weather(iata)
    return_value = {
        'temp': airport_weather['temp']['celsius'],
        'pressure_hg': airport_weather['pressure']['hg'],
        'pressure_hpa': airport_weather['pressure']['hpa'],
        'visibility_km': airport_weather['sky']['visibility']['km'],
        'humidity': airport_weather['humidity'],
        'wind_degree': airport_weather['wind']['direction']['degree'],
        'wind_desc': airport_weather['wind']['direction']['text'],
        'wind_speed':airport_weather['wind']['speed']['kmh']
    }
    return jsonify(return_value)

if __name__ == "__main__":
    app.run(debug=True, port=5555)