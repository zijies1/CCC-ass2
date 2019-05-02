import tweepy
import json
import couchdb
import time
import config
from textblob import TextBlob
import sys

import keywords

## configs
appnum = 2
consumer_key = config.app_keys_tokens[appnum]['consumer_key']
consumer_secret = config.app_keys_tokens[appnum]['consumer_secret']
access_token = config.app_keys_tokens[appnum]['access_token']
access_token_secret = config.app_keys_tokens[appnum]['access_token_secret']

sincedate = "2019-04-21"
untildate = "2019-04-30"
geo = "-37.815338,144.963226,35km"

username = "admin"
password = "admin"
couchserver = couchdb.Server("http://%s:%s@172.17.0.2:5984/" % (username,password))
try:
	db = couchserver.create('test')
except:
	db = couchserver['test']


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


if __name__ == '__main__':
	# if len(sys.argv) >= 2:
	# 	city = sys.argv[1]
	# else:
	# 	print('no parameter!')
	# 	sys.exit(0)

	## app keys and tokens

	print('---------- Now collecting Tweets ----------')
	auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
	auth.set_access_token(access_token, access_token_secret)
	api = tweepy.API(auth,wait_on_rate_limit=True)

	## search method ##
	past_N = 10000
	counter = 0
	tweets = tweepy.Cursor(api.search,since=sincedate,until=untildate,count=past_N,geocode=geo,tweet_mode='extended').items(past_N)
	while True:
		## time, content, location
		try:
			tweet = tweets.next()
		except tweepy.TweepError as e1:
			print(e1.reason)
			time.sleep(60 * 15)
			continue
		except StopIteration as e2:
			# print("-------429-------")
			print("Finish search!")
			break
		except Exception as e3:
			print(e3)
			continue

		try:
			created_at = tweet._json['created_at']
			text = tweet._json['full_text']

			## get photo url if there is one
			photo = None
			if 'media' in tweet._json['entities']:
				for media in tweet._json['entities']['media']:
					if media['type'] == 'photo':
						photo = media['media_url']
			place = None
			coordinates = None
			if tweet._json['coordinates']:
				counter += 1
				place = tweet._json['place']['name']
				coordinates = tweet._json['coordinates']['coordinates']

			# is_fastfood = is_fastfood_tweet(text)


			dic = {'created_at':created_at,'text':text, 'photo':photo, 'place':place,'coordinates':coordinates}
			# newjson = json.dumps(dic)
			# print(newjson)
			try:
				db.save(dic)
			except Exception as e:
				print(e)

		except Exception as e:
			print('-------Error-------')
			print(e)

	print('%d/%d tweets have coordinates information' % (counter,past_N))
