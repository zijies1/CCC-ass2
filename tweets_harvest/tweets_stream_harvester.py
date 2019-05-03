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
        self.num = 0

    def on_status(self, status):
        try:
            self.num += 1
            print(self.num)
            # created_at = status._json['created_at']
            # if status._json['truncated'] == True:
            #     text = status.extended_tweet['full_text']
            # else:
            #     text = status.text

            # ## get photo url if there is one
            # photo = None
            # if 'media' in status._json['entities']:
            #     for media in status._json['entities']['media']:
            #         if media['type'] == 'photo':
            #             photo = media['media_url']

            # place = None
            # coordinates = None
            # if status._json['coordinates']:
            #     place = status._json['place']['name']
            #     coordinates = status._json['coordinates']['coordinates']

            # dic = {'created_at':created_at,\
            # 'text':text,\
            # 'photo':photo,\
            # 'place':place,\
            # 'coordinates':coordinates}

            # try:
            #     db.save(dic)
            # except Exception as e:
            #     print(e)

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
    api = tweepy.API(auth, wait_on_rate_limit=True)


    username = "rongxiaol"
    password = "12345678"
    IP = "127.0.0.1"
    port = "5984"
    db_name = 'raw_' + city_name.lower()
    couchserver = couchdb.Server("http://%s:%s@%s:%s/" % (username,password,IP,port))
    try:
        # return couchserver.create('test')
        db = couchserver.create(db_name)
    except:
        # return couchserver['test']
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
