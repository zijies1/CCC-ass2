import tweepy
import json
import couchdb
import time
import config
import sys

# 1h - 450 tweets

class TweetListener(tweepy.StreamListener):
	def __init__(self,db,city_name):
		tweepy.StreamListener.__init__(self)
		self.db = db
		self.city_name = city_name

	def on_status(self, status):
		try:
			tweet = status._json
			if tweet['geo']:
				print(tweet)
				print()
			if 'extended_tweet' in tweet:
				tweet['full_text'] = tweet['extended_tweet']['full_text']
				tweet['entities'] = tweet['extended_tweet']['entities']
			else:
				tweet['full_text'] = tweet['text']
			new_dic = {
			'_id':tweet['id_str'],
			'created_at':tweet['created_at'],
			'full_text':tweet['full_text'],
			'entities':tweet['entities'],
			'source':tweet['source'],
			'user':tweet['user'],
			'geo':tweet['geo'],
			'coordinates':tweet['coordinates'],
			'place':tweet['place'],
			'lang':tweet['lang'],
			'retweet_count':tweet['retweet_count'],
			'favorite_count':tweet['favorite_count'],
			'is_quote_status':tweet['is_quote_status'],
			'city':city_name
			}
			if new_dic['is_quote_status'] == True and 'quoted_status' in tweet:
				new_dic['quoted_status'] = tweet['quoted_status']
			else:
				new_dic['quoted_status'] = None
			db.save(new_dic)

		except Exception as e:
			print(e)

	def on_error(self, status):
		print(status)

if __name__ == '__main__':
	city_name = 'Melbourne'
	username = "rongxiaol"
	password = "12345678"
	IP = "localhost"
	port = "5984"
	
	# if len(sys.argv) >= 2:
	#   city_name = sys.argv[1]
	# else:
	#   print('no parameter!')
	#   sys.exit(0)
	
	## app keys and tokens
	app_id = config.stream_appid[city_name]
	consumer_key = config.app_keys_tokens[app_id]['consumer_key']
	consumer_secret = config.app_keys_tokens[app_id]['consumer_secret']
	access_token = config.app_keys_tokens[app_id]['access_token']
	access_token_secret = config.app_keys_tokens[app_id]['access_token_secret']

	## get api
	auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
	auth.set_access_token(access_token, access_token_secret)
	api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)

	## connect to database
	db_name = 'raw_' + city_name.lower()
	couchserver = couchdb.Server("http://%s:%s@%s:%s/" % (username,password,IP,port))
	try:
	    db = couchserver.create(db_name)
	except:
	    db = couchserver[db_name]

	## start to listen
	tweetlistener = TweetListener(db,city_name)
	print('---------- Now collecting Tweets ----------')

	## melbourne location info ##
	coordinates = config.coordinates[city_name]

	## stream method ##
	stream = tweepy.Stream(auth, tweetlistener,tweet_mode='extended')
	stream.filter(locations=coordinates)
