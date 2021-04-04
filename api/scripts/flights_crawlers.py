"""
获取国内航班数据
"""

# coding = utf-8
import requests
import json
from datetime import datetime


def get_flights(c1, c2, c1_iata, c2_iata, m, d):
    headers = {
        'accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
        'content-type': 'application/json;charset=UTF-8',
        'Content-Length': '306',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
        'Cookie': '__ftoken=Gsd%2Fem%2Fc%2B2IaI2ZCj1jECf9Aximbu0lMMrIUe3jFOJ4ZJnP0t3ircyG96Jj6mFYAfTbLtX5Isa0SOwbiuFBd5Q%3D%3D; __ftrace=651a213f-36ef-4cb9-9442-0e7362bff96a; Hm_lvt_c6a93e2a75a5b1ef9fb5d4553a2226e5=1615280495; __tctmu=144323752.0.0; longKey=1615280496931969; __tctrack=0; _dx_uzZo5y=658e06675ac870320396e17609565d209edad59ee4746a415afc4be3b36e6b2b6d270500; NewProvinceId=3; NCid=53; NewProvinceName=%E5%8C%97%E4%BA%AC; NCName=%E5%8C%97%E4%BA%AC; searchSteps=2; Hm_lvt_64941895c0a12a3bdeb5b07863a52466=1615348583,1616905870; Hm_lpvt_64941895c0a12a3bdeb5b07863a52466=1616905870; 17uCNRefId=RefId=14211860&SEFrom=google&SEKeyWords=; TicketSEInfo=RefId=14211860&SEFrom=google&SEKeyWords=; CNSEInfo=RefId=14211860&tcbdkeyid=&SEFrom=google&SEKeyWords=&RefUrl=https%3A%2F%2Fwww.google.com.hk%2F; qdid=-9999,35294|1|14211860|be6ca5; __tctmz=144323752.1616905870433.6.2.utmccn=(referral)|utmcsr=google.com.hk|utmcct=|utmcmd=referral; AIRPLANECITYNAME=%25E5%258C%2597%25E4%25BA%25AC%2524%25E4%25B8%258A%25E6%25B5%25B7%2524%25241%25242021-03-28%2524%2524%25240%2524%2524%2524%2524%2524%2524; fSearchHis=; __tctmd=144323752.737325; Hm_lpvt_c6a93e2a75a5b1ef9fb5d4553a2226e5=1616917619; __tctmc=144323752.4525749; __tctma=144323752.1615280496931969.1615280496722.1616905870433.1616917619315.7; __tctmb=144323752.3225022185416780.1616917619315.1616917619315.1; route=95e291ab3c2e10cfb4323494ebf2a6bd; _dx_app_bc4b3ca6ae27747981b43e9f4a6aa769=606034784F4G5FNHhqYCI8XZ1ntqvBZQze9GOD41',
        'Host': 'www.ly.com',
        'Origin': 'https://www.ly.com',
        'Referer': ('https://www.ly.com/flights/itinerary/oneway/%s-%s?date=2021-%s-%s&from=%s&to=%s' % (
            c1_iata, c2_iata, c1, c2, m, d)).encode("utf-8"),
        'tcplat': '1'
    }
    payload = (
                '{"Departure":"%s","Arrival":"%s","GetType":"1","QueryType":"1","fromairport":"","toairport":"","DepartureDate":"2021-%s-%s","DepartureName":"%s","ArrivalName":"%s","IsBaby":0,"paging":{"dataflag":"all"},"DepartureFilter":"","ArrivalFilter":"","flat":1,"plat":1,"isFromKylin":1,"refid":"14211860"}' % (
            c1_iata, c2_iata, m, d, c1, c2)).encode("utf-8")
    url = "https://www.ly.com/flights/api/getflightlist"
    
    try:
        response = requests.request("POST", url, headers=headers, data=payload)
        flights_info = response.json()['body']['FlightInfoSimpleList']
    except Exception as e:
        print('Cannot get flights from %s to %s' % (c1, c2))
        flights_info = None
    
    return flights_info


def get_from_to_list():
    with open('./airports.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    data_slim, main_iata_list = [], []
    for item in data:
        if item['main_airport_iata'] in main_iata_list:
            continue
        else:
            main_iata_list.append(item['main_airport_iata'])
            data_slim.append({'city': item['city'], 'iata': item['main_airport_iata']})
    
    from_to_data = []
    for i in range(len(data_slim) - 1):
        city1, city1_iata = data_slim[i]['city'], data_slim[i]['iata']
        if city1_iata != 'PEK':
            continue
        for j in range(i + 1, len(data_slim)):
            city2, city2_iata = data_slim[j]['city'], data_slim[j]['iata']
            from_to_data.append({'city1': city1, 'city1_iata': city1_iata, 'city2': city2, 'city2_iata': city2_iata})
    return from_to_data


if __name__ == '__main__':
    # from_to_list = get_from_to_list()
    from_to_list = [{'city1': '北京', 'city1_iata': 'PEK', 'city2': '上海', 'city2_iata': 'PVG'},
                    {'city1': '上海', 'city1_iata': 'PVG', 'city2': '北京', 'city2_iata': 'PEK'},
                    {'city1': '上海', 'city1_iata': 'PVG', 'city2': '广州', 'city2_iata': 'CAN'},
                    {'city1': '广州', 'city1_iata': 'CAN', 'city2': '上海', 'city2_iata': 'PVG'},
                    {'city1': '北京', 'city1_iata': 'PEK', 'city2': '广州', 'city2_iata': 'CAN'},
                    {'city1': '广州', 'city1_iata': 'CAN', 'city2': '北京', 'city2_iata': 'PEK'},]
    month, days = '04', ['04']
    
    flights_data_list = []
    for day in days:
        for r in from_to_list:
            flights_data = get_flights(r['city1'], r['city2'], r['city1_iata'], r['city2_iata'], month, day)
            if not flights_data:
                continue
            flights_data_list.extend(flights_data)
        
    useful_attrs = [
        'flightNo', 'aapname', 'arrivalTime', 'arriveAirportCode', 'oapname', 'flyOffTime', 'originAirportCode', 'sts'
    ]
    
    flights_data_list_reduce = []
    for fd in flights_data_list:
        row = dict((k, v) for k, v in fd.items() if k in useful_attrs)
        flights_data_list_reduce.append(row)
        
    with open('./static_flights_data.json', 'w', encoding='utf-8') as f:
        json.dump(flights_data_list_reduce, f, ensure_ascii=False)
