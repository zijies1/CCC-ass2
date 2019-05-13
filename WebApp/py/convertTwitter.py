# -*- coding: utf-8 -*-
import json
import os
from countTwitters import *
from random import randint
# filepath of twitter json file
twitter_geoJson_file = '../twitter.geojson'
geometry_vic = '../vicGeometry.geojson'
geometry_mel = '../melGeometry.geojson'
geometry_aus = '../ausGeometry.json'
# geometry_aus = '../sample.json'
geometry_aus2 = '../webpack-react/src/data/ausGeometry2.json'
geometry_aus0 = '../ausGeometry0.json'


def rmSpace(str):
    new = []
    for c in str:
        if c not in "\ \t\r\n\f\"":
            new.append(c)
    return "".join(new)



def twitter_to_geoJsonObject(msg,geoloc):
    str = "{\n\"type\": \"Feature\",\n"+\
             "\"properties\":{\n"+"\"message\":\"" + rmSpace(msg) + "\"\n},\n" +\
             "\"geometry\": {\n\"coordinates\":" +\
             " \n[" + geoloc[0] + "," + geoloc[1] + "],\n" +\
             "\"type\": \"Point\"\n"+\
          "}\n},"
    return str


def main():
    fh = open(twitter_file,'r', encoding="utf8")
    fw = open(twitter_geoJson_file,'w+',encoding="utf8")
    line = fh.readline()
    cnt = 1
    fw.write("{\n\"features\":\n [\n")

    for line in fh:
        cnt+=1
        try:
            # remove the last newline character and comma
            json_data = json.loads(line.rstrip(',\ \t\r\n\f'))
            text = str(json_data['doc']['text']).lower()
            coord = json_data['doc']['coordinates']['coordinates']
            fw.write(twitter_to_geoJsonObject(text,[str(coord[0]),str(coord[1])]))

        except Exception as err:
            print('Error: ', err)

    # remove the last comma of the file
    fw.seek(-1, os.SEEK_END)
    fw.truncate()
    fw.write("],\n\"type\": \"FeatureCollection\"\n}")
    fw.close()
    fh.close()

def main2():
    vic_dic = getGeometry(source_vic,"POSTCODE")
    mel_dic = getGeometry(source_melbourne,"name")
    count_mel_dic = initialize_dic(mel_dic)
    count_vic_dic = initialize_dic(vic_dic)
    fh = open(twitter_file,'r',encoding="utf8")
    fw = open(twitter_geoJson_file,'w+', encoding="utf8")
    cnt = 0
    fw.write("{\n\"features\":\n [\n")

    for line in fh:
        cnt+=1
        try:
            # remove the last newline character and comma
            json_data = json.loads(line.rstrip(',\ \t\r\n\f'))
            text = str(json_data['doc']['text']).lower()
            coord = json_data['doc']['coordinates']['coordinates']
            fw.write(twitter_to_geoJsonObject(text,[str(coord[0]),str(coord[1])]))
            twitterArea(coord,mel_dic,count_mel_dic)
            twitterArea(coord,vic_dic,count_vic_dic)

        except Exception as err:
            # pass
            print('Error: ', err)

    # remove the last comma of the file
    fw.seek(-1, os.SEEK_END)
    fw.truncate()
    fw.write("],\n\"type\": \"FeatureCollection\"\n}")
    fw.close()
    fh.close()


    write_to_file(geometry_vic,count_vic_dic,vic_dic)
    write_to_file(geometry_mel,count_mel_dic,mel_dic)

def check(coord,name):
    if abs(coord[0]) > 180 or abs(coord[1]) > 90:
        print(name)

def write_list_of_coord(geolocs,cityName):
    final_str = ""
    last_index2 = len(geolocs)-1
    # print("len(geolocs)",len(geolocs))
    final_str +=  "["
    for y in range(last_index2):
        # print(geolocs[y])
        #1
        check(geolocs[y],cityName)
        final_str +=  "[" + str(geolocs[y][0]) + "," + str(geolocs[y][1]) + "],"
    #2
    check(geolocs[last_index2],cityName)
    final_str +=  "[" + str(geolocs[last_index2][0]) + "," + str(geolocs[last_index2][1]) + "]]"



    return final_str

def main3():
    fh = open(geometry_aus, 'r', encoding="utf8")
    fw = open(geometry_aus2, 'w+', encoding="utf8")
    fw.write("{\"type\": \"FeatureCollection\",\n\"features\":[")

    count =1
    try:
        json_data = json.loads(fh.read())
        list = json_data["features"]
        # print(len(list))
        for area in list:
            # print(count)
            # print(area["properties"]["phn_name"])
            # print(area["properties"]["est_ppl_18yrs_plus_obese_2014_15_num"])

            cityName = area["properties"]["phn_name"]
            id = count
            size = area["properties"]["est_ppl_18yrs_plus_obese_2014_15_num"]
            geolocs = area["geometry"]["coordinates"]
            final_str = "\n{\"type\": \"Feature\",\"id\":\"" + str(id) + "\","+ \
                     "\"properties\":{"+"\"name\":\"" + cityName + "\"," + \
                     "\"density\":" + str(size) + "}," +\
                     "\"geometry\": {\"type\":\"MultiPolygon\",\"coordinates\":"
            #case1
            append_str = ""
            case2 = 0
            cou = 0
            print(len(geolocs),len(geolocs[0]),len(geolocs[0][0]),len(geolocs[0][0][0]),cityName)
            while(len(geolocs) == 1):
                geolocs = geolocs[0]
                final_str+="["
                append_str+="]"
                cou +=1

            last_index = len(geolocs)-1
            print(len(geolocs))
            print(cou)
            if(cou == 2):
                final_str+=write_list_of_coord(geolocs,cityName)
                final_str += append_str
            else:
                final_str+="["
                for x in range(last_index):
                    final_str+="["
                    # xx,1
                    final_str+=write_list_of_coord(geolocs[x][0],cityName)
                    final_str+="],"
                final_str+="["
                # xx,1
                final_str+=write_list_of_coord(geolocs[last_index][0],cityName)
                final_str+="]]"


            final_str += "}},"
            fw.write(final_str)
            count+=1


    except Exception as err:
        print('Error: ', err)
    fw.write("\n]}")
    fw.close()
    fh.close()

def main4():
    fh = open(geometry_aus, 'r', encoding="utf8")
    try:
        json_data = json.loads(fh.read())
        list = json_data["features"]
        print(len(list))
        for area in list:
            geolocs = area["geometry"]["coordinates"]
            cityName = area["properties"]["phn_name"]
            print(len(geolocs),len(geolocs[0]),len(geolocs[0][0]),len(geolocs[0][0][0]),cityName)

    except Exception as err:
        print('Error: ', err)

    fh.close()

if __name__ == '__main__':
    main3()
