import tweepy
import json

consumer_key = 'CP20F8yCMC85K26XY07w4XElp'
consumer_secret = '4t1r4cdlBPGVzkosnZ2gvBqXbet5MbuJIlkuN0JKYufWIdo4yM'
access_token = '1121041186305630208-hG4Jv9cfPOufx3vAgPpBUCODlWsHQH'
access_token_secret = 'OJSXpMxZDzY9XUo2gqoqZcLUyGY1C9duopI4032fywDPb'

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

class PrintListener(tweepy.StreamListener):
    def on_data(self, data):
        tweet = json.loads(data)
        print(tweet)
        print()
        print('@%s: %s' % (tweet['user']['screen_name'], tweet['text'].encode('ascii', 'ignore')))

    def on_error(self, status):
        print(status)

if __name__ == '__main__':
    listener = PrintListener()

    print('---------- Now collecting Tweets ----------')

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)

    stream = tweepy.Stream(auth, listener)
    mel = [144.59,-38.43,145.51,-37.51]
    # syd = [150.52,-34.12,151.34,-33.58]
    # vic = [140.96,-39.18,144.04,-33.98,144.04,-39.16,149.98,-35.91]    
    stream.filter(locations=mel)
    # stream.filter(track=['apple'])