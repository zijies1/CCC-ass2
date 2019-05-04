import json
import couchdb
import config
from textblob import TextBlob
import sys
import keywords

def is_fastfood_tweet(text):
	lower_text = text.lower()
	for keyword in keywords.fastfood:
		if keyword in lower_text:
			return True
	return False

def get_sentiment(text):
	sentiment = TextBlob(text)
	senti_score = sentiment.sentiment.polarity
	if senti_score > 0:
		return "positive"
	elif senti_score == 0:
		return "neutral"
	else:
		return "negative"

# function to process tweet
def analyse_tweet(tweet):
	try:
		tweet_id = tweet['_id']
		created_at = tweet['created_at']
		text = tweet['full_text']

		## get photo url if there is one
		photo = None
		if 'media' in tweet['entities']:
			for media in tweet['entities']['media']:
				if media['type'] == 'photo':
					photo = media['media_url']
		place = None
		coordinates = None
		if tweet['coordinates']:
			# counter += 1
			place = tweet['place']['name']
			coordinates = tweet['coordinates']['coordinates']

		# is_fastfood = is_fastfood_tweet(text)
		return ({'_id':str(tweet_id),\
			'created_at':created_at,\
			'text':text,\
			'photo':photo,\
			'place':place,\
			'coordinates':coordinates})

	except Exception as e:
		print(e)

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
		tweet = dict(db2read[ID])

		newdic = analyse_tweet(tweet)
		try:
			db2save.save(newdic)
		except Exception as e:
			print(e)
