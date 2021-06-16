import requests
import json
import sys

def get_flights_in_bounds(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        flights = json.load(f) 
    return flights


def get_airspace_geojson():
    with open('./scripts/airspace.json', 'r', encoding='utf-8') as f:
        airspace = json.load(f)['features']    
    return airspace


def _bbox_around_polycoords(coords):
    x_all, y_all = [], []
    for first in coords[0]:
        x_all.append(first[1])
        y_all.append(first[0])
    return [min(x_all), min(y_all), max(x_all), max(y_all)]


def _point_in_bbox(point, bounds):
    return not(point['latitude'] < bounds[0] or point['latitude'] > bounds[2]
        or point['longitude'] < bounds[1] or point['longitude'] > bounds[3])


def _pnpoly(x, y, coords):
    vert = [[0, 0]]
    for coord in coords:
        for node in coord:
            vert.append(node)
        vert.append(coord[0])
        vert.append([0, 0])

    inside = False

    i = 0
    j = len(vert) - 1

    while i < len(vert):
        if ((vert[i][0] > y) != (vert[j][0] > y)) and (x < (vert[j][1] - vert[i][1])
                                                       * (y - vert[i][0]) / (vert[j][0] - vert[i][0]) + vert[i][1]):
            inside = not inside
        j = i
        i += 1

    return inside


def _point_in_polygon(point, coords):
    inside_box = False
    for coord in coords:
        if inside_box:
            break
        if _point_in_bbox(point, _bbox_around_polycoords(coord)):
            inside_box = True
    if not inside_box:
        return False

    inside_poly = False
    for coord in coords:
        if inside_poly:
            break
        if _pnpoly(point['latitude'], point['longitude'], coord):
            inside_poly = True
    return inside_poly


def _points_in_polygon(points, polygon):
    coords = [polygon['coordinates']] if polygon['type'] == 'Polygon' else polygon['coordinates']
    cnt, inner_points = 0, []
    for point in points:
        if _point_in_polygon(point, coords): 
            cnt += 1
            inner_points.append(point)
    return cnt, inner_points

def get_airspace_stat(flights, airspace):
    airspace_geojson = [{'name': row['properties']['name'], 'geometry': row['geometry']} for row in airspace]
    flights_in_airspace_stat = []
    for airspace in airspace_geojson:
        count, inner_points = _points_in_polygon(flights, airspace['geometry'])
        speed = [p['speed'] for p in inner_points] if inner_points else [0]
        flights_in_airspace_stat.append({
            "name": airspace['name'],
            "flights_count": count,
            "flights_avg_speed": sum(speed)/len(speed),
        })
    return flights_in_airspace_stat


def get_flights_in_airspace(flights, airspace):
    polygon = airspace['geometry']
    coords = [polygon['coordinates']] if polygon['type'] == 'Polygon' else polygon['coordinates']
    flights_in_airspace_list = []
    for point in flights:
        if _point_in_polygon(point, coords): 
            flights_in_airspace_list.append(point)
    return flights_in_airspace_list


def flights_in_airspace(airspace_index=None):
    flights_info = get_flights_in_bounds('./scripts/flights_in_bounds.json')
    airspace_geojson = get_airspace_geojson()
    if not airspace_index:
        flights_in_airspace_json = get_airspace_stat(flights_info, airspace_geojson)
        flights_in_airspace_json.sort(key=lambda x: x['flights_count'])
    else:
        flights_in_airspace_json = get_flights_in_airspace(flights_info, airspace_geojson[int(airspace_index)])
    return flights_in_airspace_json


if __name__ == "__main__":
    v = flights_in_airspace()
