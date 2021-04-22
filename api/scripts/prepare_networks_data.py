import json


def load_data():
    with open('../../src/asset/airports.json', 'r', encoding='utf-8') as f:
        airports = json.load(f)
    with open('./static_flights_data_0405.json', 'r', encoding='utf-8') as f:
        flights = json.load(f)
    return airports, flights

def _get_data_map(airports):
    id_ap_map, cate_prov_map = {}, {}
    for idx, row in enumerate(airports):
        if row['airport_iata'] not in id_ap_map:
            id_ap_map[row['airport_iata']] = len(id_ap_map)
        if row['province'] not in cate_prov_map:
            cate_prov_map[row['province']] = len(cate_prov_map)
    return id_ap_map, cate_prov_map

def _clear_repeat_flights(flights):
    flights_slim = []
    for f in flights:
        if f not in flights_slim:
            flights_slim.append(f)
    return flights_slim

def convert_to_networks_format(airports, flights):
    id_ap_map, cate_prov_map = _get_data_map(airports)
    flights = _clear_repeat_flights(flights)
    nodes, links, categories, flows = [], [], [], []
    for idx, row in enumerate(airports):
        nodes.append({
            'id': str(id_ap_map[row['airport_iata']]),
            'name': row['airport_name'],
            'lat': row['latitude'],
            'lon': row['longitude'],
            'iata': row['airport_iata'],
            'category': cate_prov_map[row['province']],
        })
    for key in cate_prov_map:
        categories.append({
            'name': key
        })
    for row in flights:
        links.append({
            'source': id_ap_map[row['originAirportCode']],
            'target': id_ap_map[row['arriveAirportCode']],
            'sourceAirport': row['oapname'],
            'targetAirport': row['aapname'],
        })
    for link in links:
        count = links.count(link)
        flow = {
            'source': str(link['source']),
            'sourceAirport': link['sourceAirport'],
            'target': str(link['target']),
            'targetAirport': link['targetAirport'],
            'count': count,
        }
        if flow not in flows:
            flows.append(flow)
    return nodes, categories, flows


if __name__ == '__main__':
    airports, flights = load_data()
    nodes, categories, flows = convert_to_networks_format(airports, flights)
    networks = {
        'nodes': nodes,
        'flows': flows,
        'categories': categories,
    }
    with open('./networks_data_0405_new.json', 'w', encoding='utf-8') as f:
        json.dump(networks, f, ensure_ascii=False)