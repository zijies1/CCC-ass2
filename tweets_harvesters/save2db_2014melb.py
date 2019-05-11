import json
import couchdb

city_name = 'Melbourne'
username = "admin"
password = "123456"
IP = "172.26.37.244"
port = "5984"
db_name = 'raw_2014' + city_name.lower()
couchserver = couchdb.Server("http://%s:%s@%s:%s/" % (username,password,IP,port))
try:
	db = couchserver.create(db_name)
except:
	db = couchserver[db_name]

with open('./2014melb.json','r',encoding='utf-8') as f:
	line = f.readline()
	while line:
		line = line.strip('\n, ')
		if line.startswith('{') and line.endswith('}'):
			try:
				line = json.loads(line)
				tweet = line['doc']
				new_dic = {
				'_id':tweet['_id'],
				'created_at':tweet['created_at'],
				'full_text':tweet['text'],
				'entities':tweet['entities'],
				'source':tweet['source'],
				'user':tweet['user'],
				'geo':tweet['geo'],
				'coordinates':tweet['coordinates'],
				'place':tweet['place'],
				'is_quote_status':False,
				'quoted_status':None,
				'retweet_count':tweet['retweet_count'],
				'favorite_count':tweet['favorite_count'],
				'lang':tweet['lang'],
				'city':city_name
				}
				db.save(new_dic)
			except Exception as e:
				print(e)
		line = f.readline()

print('finish')
