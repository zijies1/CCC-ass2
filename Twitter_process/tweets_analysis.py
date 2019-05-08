import json
import couchdb
import config
from textblob import TextBlob
import sys
import keywords
from profanity_check import predict, predict_prob

# def get_foods(text):
# 	

def get_wrath_score(text):
	# pred = predict([text])
	prob = predict_prob([text])
	return prob[0]

def get_senti_score(text):
	sentiment = TextBlob(text)
	senti_score = sentiment.sentiment.polarity
	return senti_score
	# if senti_score > 0:
	# 	return "positive"
	# elif senti_score == 0:
	# 	return "neutral"
	# else:
	# 	return "negative"
	
def get_period(created_at):
	datetime = created_at.split()
	weekday = datetime[0]
	month = datetime[1]
	day = datetime[2]
	time = datetime[3]
	year = datetime[5]
	hour = time.split(":")[0]
	return [weekday,month,day,hour,year]


if __name__ == '__main__':
	# if len(sys.argv) >= 2:
	# 	city_name = sys.argv[1]
	# 	geocode = config.geocodes[city_name]
	# else:
	# 	print('no parameter!')
	# 	sys.exit(0)
	city_name = 'Melbourne'
	username = "rongxiaol"
	password = "12345678"
	IP = "127.0.0.1"
	port = "5984"
	db_raw = 'raw_' + city_name.lower()
	db_pro = 'pro_' + city_name.lower()
	couchserver = couchdb.Server("http://%s:%s@%s:%s/" % (username, password, IP, port))
	
	# get original database to read
	try:
		db2read = couchserver.create(db_raw)
	except:
		db2read = couchserver[db_raw]

	# get new database to save
	try:
		db2save = couchserver.create(db_pro)
	except:
		db2save = couchserver[db_pro]

	# process raw tweets and save them to new database
	for ID in db2read:
		try:
			tweet = dict(db2read[ID])
			wrath_score = get_wrath_score(tweet['full_text'])
			senti_score = get_senti_score(tweet['full_text'])
			time_period = get_period(tweet['created_at'])
			
			newdic = {
				'_id':tweet['_id'],
				'full_text':tweet['full_text'],
				'user':tweet['user'],
				'geo':tweet['geo'],
				'coordinates':tweet['coordinates'],
				'retweet_count':tweet['retweet_count'],
				'favorite_count':tweet['favorite_count'],
				'weekday':time_period[0],
				'month':time_period[1],
				'day':time_period[2],
				'hour':time_period[3],
				'year':time_period[4],
				'wrath_score':wrath_score,
				'senti_score':senti_score,
				# 'foods':
			}
			# print(newdic)
			db2save.save(newdic)
		except Exception as e:
			print(e)
