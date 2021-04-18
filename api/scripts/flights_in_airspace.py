import requests
import json
import sys

def get_flights_in_bounds(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        flights = json.load(f) 
    return flights


def get_airspace_geojson():
    with open('./airspace.json', 'r', encoding='utf-8') as f:
        airspace = json.load(f)['features']    
    return airspace


def _bbox_around_polycoords(coords):
    x_all, y_all = [], []
    for first in coords[0]:
        x_all.append(first[1])
        y_all.append(first[0])
    return [min(x_all), min(y_all), max(x_all), max(y_all)]


def _point_in_bbox(point, bounds):
    return not(point[1] < bounds[0] or point[1] > bounds[2]
        or point[0] < bounds[1] or point[0] > bounds[3])


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
        if _pnpoly(point[1], point[0], coord):
            inside_poly = True
    return inside_poly


def _points_in_polygon(points, polygon):
    coords = [polygon['coordinates']] if polygon['type'] == 'Polygon' else polygon['coordinates']
    cnt, speed = 0, []
    for point in points:
        if _point_in_polygon(point, coords): 
            cnt += 1
            speed.append(point[2])
    return cnt, sum(speed)/len(speed) if speed else 0

def flights_airspace_info(flights, airspace):
    flights_coordinate = [[row['longitude'], row['latitude'], row['speed']] for row in flights]
    airspace_geojson = [{'name': row['properties']['name'], 'geometry': row['geometry']} for row in airspace]
    airspace_flights_info = []
    for airspace in airspace_geojson:
        count, avg_speed = _points_in_polygon(flights_coordinate, airspace['geometry'])
        airspace_flights_info.append({
            "name": airspace['name'],
            "flights_count": count,
            "flights_avg_speed": avg_speed,
        })
    airspace_flights_info.sort(key=lambda x:x['flights_count'])
    return airspace_flights_info


if __name__ == "__main__":
    flights_info = get_flights_in_bounds('./flights_in_bounds_04181509.json')
    airspace_geojson = get_airspace_geojson()
    flights_in_airspace = flights_airspace_info(flights_info, airspace_geojson)
    print(flights_in_airspace)

    with open('./flights_in_airspace.json', 'w', encoding='utf-8') as f:
        json.dump(flights_in_airspace, f, ensure_ascii=False)