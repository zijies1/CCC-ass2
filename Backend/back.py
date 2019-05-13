from flask import Flask 
from flask import stream_with_context, request, Response
from flask import jsonify
import couchdb 
import json
import operator

couch = couchdb.Server('http://admin:12345@127.0.0.1:5984')

melb14db = couch['melb14food']

app = Flask(__name__)

@app.route('/api/melb14', methods=['GET'])
def f():
	result_list = []
	textkey = "full_text"
	coorkey = "coordinates"

	def generate():
		for i in melb14db:
			doc = melb14db[i]
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

			yield json.dumps(resp)

	# result_list.append(resp)

	# def generate():
	# 	yield json.dumps({'result': result_list})

	# return json.dumps({'result': result_list})
	return Response(stream_with_context(generate()))


@app.route('/api/gluttonynum', methods=['POST'])
def getGluttonynum():
	if not request.json or not 'location' in request.json:
		abort(400)
	loc = request.json['location']
	year = request.json['year']

	user_food_cnt = {}
	dv = melb14db.view('_design/foodtags/_view/new-view', reduce=True, group=True)

	for row in dv:
		user_food_cnt[row.key] = row.value

	sorted_food_cnt = sorted(user_food_cnt.items(), key=operator.itemgetter(1), reverse=True)
	l = len([i for i in sorted_food_cnt if i[1] > 10])

	return jsonify({ 'num' : l })



if __name__ == '__main__':
	app.run()




