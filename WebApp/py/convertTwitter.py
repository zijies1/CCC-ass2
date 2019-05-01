import json
import os
# filepath of twitter json file
twitter_file = '../tinyTwitter.json'
twitter_geoJson_file = '../tinyTwitter.geojson'

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
    fh = open(twitter_file, 'r')
    fw = open(twitter_geoJson_file, 'w+')
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

if __name__ == '__main__':
    main()
