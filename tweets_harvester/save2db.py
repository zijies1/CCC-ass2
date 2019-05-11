import json
import couchdb
import tweets_analysis
import time
import sys

start = time.time()

if __name__ == '__main__':
	username = "admin"
	password = "123456"
	IP = "172.26.38.0"
	port = "5984"

	if len(sys.argv) >= 3:
		city_name = sys.argv[1]
		file_path = sys.argv[2]
	else:
		print('no enough parameters!')
		sys.exit(0)

	db_name = city_name.lower()
	couchserver = couchdb.Server("http://%s:%s@%s:%s/" % (username,password,IP,port))
	try:
		db = couchserver.create(db_name)
	except:
		db = couchserver[db_name]

	print('---------- Now saving Tweets ----------')
	with open(file_path,'r',encoding='utf-8') as f:
		line = f.readline()
		while line:
			line = line.strip('\n, ')
			if line.startswith('{') and line.endswith('}'):
				try:
					line = json.loads(line)
					tweet = line['doc']
					time_period = tweets_analysis.get_period(tweet['created_at'])
					food_list = tweets_analysis.get_foods(tweet['text'])
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
					'lang':tweet['lang'],
					'retweet_count':tweet['retweet_count'],
					'favorite_count':tweet['favorite_count'],
					'is_quote_status':False,
					'quoted_status':None,
					'city':city_name,
					'weekday':time_period[0],
					'month':time_period[1],
					'day':time_period[2],
					'hour':time_period[3],
					'year':time_period[4],
					'foods': food_list
					}
					db.save(new_dic)
				except Exception as e:
					print(e)
			line = f.readline()
	print('time used: ', time.time()-start)
