import json
import couchdb
import config
from textblob import TextBlob
import sys
import keywords
from profanity_check import predict, predict_prob

def get_foods(text):
	jsf = open("menuitems.json")
	menudata = json.load(jsf)
	foodlist = menudata["menuItems"]
	lcfoodlist = [x.lower() for x in foodlist]

	t_textc = text.lower()
	t_textlist = t_textc.split(" ")
	return [s for s in lcfoodlist if s in t_textlist]

def get_wrath_score(text):
	# pred = predict([text])
	prob = predict_prob([text])
	return prob[0]

def get_senti_score(text):
	sentiment = TextBlob(text)
	senti_score = sentiment.sentiment.polarity
	return senti_score
	# if senti_score > 0:
	# 	return "positive"
	# elif senti_score == 0:
	# 	return "neutral"
	# else:
	# 	return "negative"
	
def get_period(created_at):
	datetime = created_at.split()
	weekday = datetime[0]
	month = datetime[1]
	day = datetime[2]
	time = datetime[3]
	year = datetime[5]
	hour = time.split(":")[0]
	return [weekday,month,day,hour,year]
