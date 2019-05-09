# -*- coding: utf-8 -*-
import json
import os
from shapely.geometry import Point
from shapely.geometry.polygon import Polygon
from random import randint


twitter_file = '../twitter2014.json'
source_melbourne = '../TheGreaterMelbourne.geojson'
source_vic = '../vic.json'

def inPolygon(coordinate,geometry):
    point = Point(coordinate[0],coordinate[1])
    try:
        polygon = Polygon(geometry)
    except Exception:
        if(len(geometry[0]) > 1):
            polygon = Polygon(geometry[0])

    return polygon.contains(point)

def twitterArea(coordinate,geometry_dic,count_dic):
    for x in geometry_dic:
        if inPolygon(coordinate,geometry_dic[str(x)]):
            count_dic[x]+=1
            break


def initialize_dic(geometry_dic):
    count_dic = {}
    for x in geometry_dic:
        count_dic[x] = 0
    return count_dic

def getGeometry(geometry,id):
    geometry_dic = {}
    fh = open(geometry, 'r', encoding="utf8")
    try:
        json_data = json.loads(fh.read())
        list = json_data["features"]
        polygon = list[0]["geometry"]["coordinates"]
        for polygon in list:
            geometry_dic[str(polygon["properties"][id])] = \
                polygon["geometry"]["coordinates"][0]

    except Exception as err:
        pass
        # print('Error: ', err)
    fh.close()
    return geometry_dic

def counts_to_geoJsonObject(cityName,geolocs,id,size):
    final_str = "\n{\"type\": \"Feature\",\"id\":\"" + str(id) + "\","+ \
             "\"properties\":{"+"\"name\":\"" + cityName + "\"," + \
             "\"density\":" + str(size) + "}," +\
             "\"geometry\": {\"type\":\"Polygon\",\"coordinates\":[["
    last_index = len(geolocs)-1
    for x in range(last_index):
        final_str +=  "[" + str(geolocs[x][0]) + "," + str(geolocs[x][1]) + "],"
    final_str +=  "[" + str(geolocs[last_index][0]) + "," +\
                        str(geolocs[last_index][1]) + "]"
    final_str += "]]}},"
    return final_str

def count_tweets(geometry,tw_file,id,geometry_dic):
    count_dic = initialize_dic(geometry_dic)
    fh = open(tw_file, 'r', encoding="utf8")
    count = 0
    for line in fh:
        try:
            # remove the last newline character and comma
            json_data = json.loads(line.rstrip(',\ \t\r\n\f'))
            coord = json_data['doc']['coordinates']['coordinates']
            # print coord
            twitterArea(coord,geometry_dic,count_dic)

        except Exception as err:
            # print('Error: ', err)
            pass
    fh.close()
    return count_dic

def write_to_file(filename,count_dic,geometry_dic):
    fw = open(filename, 'w+', encoding="utf8")
    fw.write("{\"type\": \"FeatureCollection\",\n\"features\":[")

    count = 1
    for x in count_dic:
        fw.write(counts_to_geoJsonObject(x,geometry_dic[x],count,count_dic[x]))
        count +=1

    fw.seek(-1, os.SEEK_END)
    fw.truncate()
    fw.write("]}")
    fw.close()
