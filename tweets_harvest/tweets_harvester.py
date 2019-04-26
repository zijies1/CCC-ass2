import tweepy
import json

consumer_key = 'CP20F8yCMC85K26XY07w4XElp'
consumer_secret = '4t1r4cdlBPGVzkosnZ2gvBqXbet5MbuJIlkuN0JKYufWIdo4yM'
access_token = '1121041186305630208-hG4Jv9cfPOufx3vAgPpBUCODlWsHQH'
access_token_secret = 'OJSXpMxZDzY9XUo2gqoqZcLUyGY1C9duopI4032fywDPb'

class PrintListener(tweepy.StreamListener):
    def on_data(self, data):
        tweet = json.loads(data)
        print(tweet)
        print()

    def on_error(self, status):
        print(status)

if __name__ == '__main__':
    print('---------- Now collecting Tweets ----------')
    listener = PrintListener()
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    stream = tweepy.Stream(auth, listener)
    api = tweepy.API(auth)
    melbourne = [144.70,-38.20,145.30,-37.60] 
    stream.filter(locations=melbourne)
    # stream.filter(track=['apple'])