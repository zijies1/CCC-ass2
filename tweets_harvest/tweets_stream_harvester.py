import tweepy
import json
import couchdb
import time
import config
import sys

# 1h - 450 tweets

# def get_api(app_id=0):
	# consumer_key = config.app_keys_tokens[app_id]['consumer_key']
	# consumer_secret = config.app_keys_tokens[app_id]['consumer_secret']
	# access_token = config.app_keys_tokens[app_id]['access_token']
	# access_token_secret = config.app_keys_tokens[app_id]['access_token_secret']

	# auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
	# auth.set_access_token(access_token, access_token_secret)
	# return tweepy.API(auth, wait_on_rate_limit=True)


class TweetListener(tweepy.StreamListener):
	def __init__(self,db):
		tweepy.StreamListener.__init__(self)
		self.db = db
		# self.num = 0

	def on_status(self, status):
		try:
			# self.num += 1
			# print(self.num)
			tweet = status._json
			# print(tweet)
			# print()
			print(tweet)
			if 'extended_tweet' in tweet:
				tweet['full_text'] = tweet['extended_tweet']['full_text']
				tweet['entities'] = tweet['extended_tweet']['entities']
			else:
				tweet['full_text'] = tweet['text']
			if tweet['is_quote_status'] == False:
				tweet['quoted_status'] = None
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
			'is_quote_status':tweet['is_quote_status'],
			'quoted_status':tweet['quoted_status'],
			'retweet_count':tweet['retweet_count'],
			'favorite_count':tweet['favorite_count'],
			'lang':tweet['lang'],
			}
			db.save(new_dic)

		except Exception as e:
			print(e)

	def on_error(self, status):
		print(status)

if __name__ == '__main__':
	# if len(sys.argv) >= 2:
	#   city_name = sys.argv[1]
	#   geocode = config.geocodes[city_name]
	# else:
	#   print('no parameter!')
	#   sys.exit(0)
	city_name = 'Melbourne'
	## app keys and tokens
	app_id=2
	consumer_key = config.app_keys_tokens[app_id]['consumer_key']
	consumer_secret = config.app_keys_tokens[app_id]['consumer_secret']
	access_token = config.app_keys_tokens[app_id]['access_token']
	access_token_secret = config.app_keys_tokens[app_id]['access_token_secret']

	auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
	auth.set_access_token(access_token, access_token_secret)
	api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)

	username = "rongxiaol"
	password = "12345678"
	IP = "127.0.0.1"
	port = "5984"
	db_name = 'raw_' + city_name.lower()
	couchserver = couchdb.Server("http://%s:%s@%s:%s/" % (username,password,IP,port))
	try:
	    db = couchserver.create(db_name)
	except:
	    db = couchserver[db_name]

	tweetlistener = TweetListener(db)

	print('---------- Now collecting Tweets ----------')
	
	## melbourne location info ##
	city = 'Melbourne'
	placeid = '01864a8a64df9dc4'
	centre = [144.963226, -37.815338]
	geocode = "-37.815338,144.963226,35km"
	coordinates = [144.593742, -38.433859, 145.512529, -37.511274]

	## stream method ##
	stream = tweepy.Stream(auth, tweetlistener,tweet_mode='extended')
	stream.filter(locations=coordinates)
