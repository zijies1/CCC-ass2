import tweepy
import json
import couchdb
import config

appnum = 3
consumer_key = config.app_keys_tokens[appnum]['consumer_key']
consumer_secret = config.app_keys_tokens[appnum]['consumer_secret']
access_token = config.app_keys_tokens[appnum]['access_token']
access_token_secret = config.app_keys_tokens[appnum]['access_token_secret']

class TweetListener(tweepy.StreamListener):
    def __init__(self,couchdb):
        tweepy.StreamListener.__init__(self)
        self.db = couchdb

    def on_status(self, status):
        try:
            created_at = status._json['created_at']
            if status._json['truncated'] == True:
                text = status.extended_tweet['full_text']
            else:
                text = status.text

            ## get photo url if there is one
            photo = None
            if 'media' in status._json['entities']:
                for media in status._json['entities']['media']:
                    if media['type'] == 'photo':
                        photo = media['media_url']

            place = None
            coordinates = None
            if status._json['coordinates']:
                place = status._json['place']['name']
                coordinates = status._json['coordinates']['coordinates']

            dic = {'created_at':created_at,'text':text,'photo':photo,'place':place,'coordinates':coordinates}
            newjson = json.dumps(dic)
            print(newjson)

            try:
                db.save(dic)
            except Exception as e:
                print(e)

        except:
            print('---Error---')

    def on_error(self, status):
        print(status)

if __name__ == '__main__':
    ## CouchDB info ##
    username = "rongxiaol"
    password = "12345678"
    couchserver = couchdb.Server("http://%s:%s@127.0.0.1:5984/" % (username,password))
    try:
        db = couchserver.create('test')
    except:
        db = couchserver['test']

    print('---------- Now collecting Tweets ----------')
    # tweetlistener = TweetListener(node)
    tweetlistener = TweetListener('db')
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth)
    
    ## melbourne location info ##
    city = 'Melbourne'
    placeid = '01864a8a64df9dc4'
    centre = [144.963226, -37.815338]
    geocode = "-37.815338,144.963226,35km"
    coordinates = [144.593742, -38.433859, 145.512529, -37.511274]

    ## stream method ##
    stream = tweepy.Stream(auth, tweetlistener,tweet_mode='extended')
    stream.filter(locations=coordinates)
