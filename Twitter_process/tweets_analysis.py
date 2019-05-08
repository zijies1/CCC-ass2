import json
import couchdb
import config
from textblob import TextBlob
import sys
import keywords
from profanity_check import predict, predict_prob

# def is_fastfood(text):
# 	lower_text = text.lower()
# 	for keyword in keywords.fastfood:
# 		if keyword in lower_text:
# 			return True
# 	return False

def is_wrath(text):
	pred = predict([text])
	prob = predict_prob([text])
	if pred[0] == 1:
		return 1
	else:
		return 0

def get_period(created_at):
	datetime = created_at.split()
	weekday = datetime[0]
	month = datetime[1]
	day = datetime[2]
	time = datetime[3]
	year = datetime[5]
	hour = time.split(":")[0]
	return [weekday,month,day,hour,year]

def get_sentiment(text):
	sentiment = TextBlob(text)
	senti_score = sentiment.sentiment.polarity
	if senti_score > 0:
		return "positive"
	elif senti_score == 0:
		return "neutral"
	else:
		return "negative"

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
			iswrath = is_wrath(tweet['full_text'])
			sentiment = get_sentiment(tweet['full_text'])
			time_period = get_period(tweet['created_at'])
			
			newdic = {
				'_id':tweet['_id'],
				'full_text':tweet['full_text'],
				'geo':tweet['geo'],
				'coordinates':tweet['coordinates'],
				'retweet_count':tweet['retweet_count'],
				'favorite_count':tweet['favorite_count'],
				'weekday':time_period[0],
				'month':time_period[1],
				'day':time_period[2],
				'hour':time_period[3],
				'year':time_period[4],
				'is_wrath':iswrath,
				'sentiment':sentiment
			}
			# print(newdic)
			db2save.save(newdic)
		except Exception as e:
			print(e)
