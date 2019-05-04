import tweepy
import json
import couchdb
import time
import config
import sys

## 15min - 2300tweets ~ 1h 1w
## 2days - 57000tweets ~ 3h 1day

def get_api(app_id=0):
	consumer_key = config.app_keys_tokens[app_id]['consumer_key']
	consumer_secret = config.app_keys_tokens[app_id]['consumer_secret']
	access_token = config.app_keys_tokens[app_id]['access_token']
	access_token_secret = config.app_keys_tokens[app_id]['access_token_secret']

	auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
	auth.set_access_token(access_token, access_token_secret)
	return tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)

if __name__ == '__main__':
	# if len(sys.argv) >= 2:
	# 	city_name = sys.argv[1]
	# 	geocode = config.geocodes[city_name]
	# else:
	# 	print('no parameter!')
	# 	sys.exit(0)
	city_name = 'Melbourne'
	## app keys and tokens

	api = get_api(app_id=3)
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

	## search method ##
	# counter = 0
	past_N = 10000 # count=past_N
	sincedate = "2019-05-01"
	untildate = "2019-05-02"
	geocode = config.geocodes[city_name]
	tweets = tweepy.Cursor(api.search, since=sincedate, until=untildate,\
		geocode=geocode, tweet_mode='extended').items()
	print('---------- Now collecting Tweets ----------')
	while True:
		try:
			tweet = tweets.next()._json
			# print(tweet)
			# print()
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
			# print(new_dic)
			# print()
			db.save(new_dic)

		except tweepy.TweepError as e1:
			print(e1.reason)
			print('tweet limit!!!')
			time.sleep(60 * 15)
			continue
		except StopIteration as e2:
			print("Finish search!")
			break
		except Exception as e3:
			print(e3)
			continue
