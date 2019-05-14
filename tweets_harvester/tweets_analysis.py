import json
import re
import menuitems

def get_foods(text):
	foodlist = menuitems.menuItems
	pro_text = " " + re.sub('[_,.#?!@&()+~:;<>/]',' ',text.lower()) + " "
	foods = []
	for food in foodlist:
		pro_food = " " + food + " "
		if pro_food in pro_text and food not in foods:
			foods.append(food)
	return foods
	
def get_period(created_at):
	datetime = created_at.split()
	weekday = datetime[0]
	month = datetime[1]
	day = datetime[2]
	time = datetime[3]
	year = datetime[5]
	hour = time.split(":")[0]
	return [weekday,month,day,hour,year]