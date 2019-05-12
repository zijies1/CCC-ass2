from flask import Flask 
from flask import jsonify
import couchdb 
import json

couch = couchdb.Server('http://admin:12345@127.0.0.1:5984')

melb14raw = couch['melb14food']

app = Flask(__name__)

@app.route('/api/melb14', methods=['GET'])
def f():
	result_list = []
	textkey = "full_text"
	coorkey = "coordinates"
	for i in melb14raw:
		doc = melb14raw[i]
		if textkey in doc:
			text = doc["full_text"]
		else:
			text = ""
		if coorkey in doc:
			coor = doc["coordinates"]["coordinates"]
		else:
			coor = []

		resp = {
			"type": "FeatureCollection",
			"features":[
				{
					"type": "Feature",
					"properties":{
						"message": text
						#content
					},
					"geometry": {
						"coordinates": coor,
						"type": "Point"
					}
				}
			]
		}
		result_list.append(resp)

	return jsonify({'result': result_list})


if __name__ == '__main__':
	app.run()




