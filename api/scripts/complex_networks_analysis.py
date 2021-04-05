import json
from collections import defaultdict, Counter


with open('./networks_data_0405.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
flows, nodes = data['flows'], data['nodes']

id_name_map = {}
for node in nodes:
    id_name_map[node['id']] = node['name']

nodes_degree, nodes_flow_in, nodes_flow_out = \
    defaultdict(int), defaultdict(int), defaultdict(int)

for flow in flows:
    nodes_degree[flow['source']] += 1
    nodes_flow_out[flow['source']] += flow['count']
    nodes_flow_in[flow['target']] += flow['count']

degree_json = []
for node_id in nodes_degree:
    degree_json.append({
        'id': node_id,
        'name': id_name_map[node_id],
        'degree': nodes_degree[node_id]
    })

degree_json_sorted = sorted(degree_json, key=lambda x: x.get('degree', 0), reverse=True)
# print(degree_json_sorted)

degrees = [row['degree'] for row in degree_json_sorted]
print(degrees, len(degrees))

p_degree = dict(Counter(degrees))
for k in p_degree:
    p_degree[k] /= len(degrees)
print(p_degree)

x, y, y_cdf = [], [], []
for k in p_degree:
    x.append(k)
    y.append(p_degree[k])
for i in range(len(y)):
    y_cdf.append(sum(y[:i+1]))
print(x, y_cdf)
