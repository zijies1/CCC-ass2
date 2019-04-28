import tweepy
import json
import couchdb

# # app harvester1 keys
# consumer_key = 'CP20F8yCMC85K26XY07w4XElp'
# consumer_secret = '4t1r4cdlBPGVzkosnZ2gvBqXbet5MbuJIlkuN0JKYufWIdo4yM'
# access_token = '1121041186305630208-hG4Jv9cfPOufx3vAgPpBUCODlWsHQH'
# access_token_secret = 'OJSXpMxZDzY9XUo2gqoqZcLUyGY1C9duopI4032fywDPb'

# app harvester2 keys
consumer_key = '2BjmB9QN2UwT7BWGEYJc6mzyQ'
consumer_secret = 'dkP4itLYIM0rqhHef4BiRkEgp8n2STc5CZuddYzjpnRzN3QX0m'
access_token = '1121041186305630208-9pyRCJS3ltExpoKeTqKVrYcdSNnqHg'
access_token_secret = 'dWIS8xzpbuB1T77UZSQCHJGBOX2uT7A82UmiwpyuSfrkq'

# # app harvester3 keys
# consumer_key = 'W225IVMaLWc3Cio8Y2ZwHmwXT'
# consumer_secret = 'D0Gebz3e1xqrSKKCNbQPCwLsjNdQVZxHguLekTU4zCavWysswy'
# access_token = '1121041186305630208-vVcpClv576aYx9OJjVaWJkYA89m7eI'
# access_token_secret = 'ZjUk3ppAaudL4KR3oDQo3K6lDMZRKrnGvj2wYRpzfx1uP'

# # app harvester4 keys
# consumer_key = 'ahKRXTnEizWqy4oHC4uBFxWuu'
# consumer_secret = 'xF2Pc3JwGtSij9Ig0UhW5A5o4RVk1kxcbTk6jMGM7W7XfOub8w'
# access_token = '1121041186305630208-85TVCtBvNc3RjW9RjmcBdwJn5FKxQm'
# access_token_secret = 'l3qRsugZsCt1MApDSjtCwMFS19Jms2Y2QiGpUPfzeWVit'

if __name__ == '__main__':
    ## CouchDB info ##
    # username = ""
    # password = ""
    # couchserver = couchdb.Server("http://%s:%scouchdb:5984/" % (username,password))
    # nodename = ""
    # node = couchserver[nodename]

    print('---------- Now collecting Tweets ----------')
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth)

    ## search method ##
    past_N = 1000
    counter = 0
    for tweet in tweepy.Cursor(api.search,count=past_N,geocode="-37.815338,144.963226,35km",tweet_mode='extended').items(past_N):
        if tweet._json['coordinates']:
            counter += 1
            print(tweet._json['created_at'])
            print(tweet._json['full_text'])
            print(tweet._json['place']['name'], tweet._json['coordinates']['coordinates'])
            # node.save(tweet)
            print()
    print('%d/%d tweets have coordinates information' % (counter,past_N))
