import json

def get_foods(text):
	jsf = open("menuitems.json", encoding='utf-8')
	menudata = json.load(jsf)
	foodlist = menudata["menuItems"]
	lcfoodlist = [x.lower() for x in foodlist]
	t_textc = text.lower()
	t_textlist = t_textc.split(" ")
	return [s for s in lcfoodlist if s in t_textc]
	
def get_period(created_at):
	datetime = created_at.split()
	weekday = datetime[0]
	month = datetime[1]
	day = datetime[2]
	time = datetime[3]
	year = datetime[5]
	hour = time.split(":")[0]
	return [weekday,month,day,hour,year]