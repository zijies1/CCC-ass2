import couchdb 
import json

couch = couchdb.Server('http://admin:123456@172.26.37.189:5984')

melbpast = couch['melbourne_past']
sydneypast = couch['sydney_past']
perthpast = couch['perth_past']
brispast = couch['brisbane_past']


viewData_foodtags={
	"userfood-view14":{
		"map":"function(doc){var foods = doc.foods;var time = doc.created_at;if (Date.parse(time) < new Date('2014-12-31') && Date.parse(time) > new Date('2014-01-01')) {foods.forEach(function(f) {emit(doc.user.id, f);});}}",
		"reduce":"function(keys, values, rereduce) {if (rereduce) {return {'count': values.reduce(function(a, b) { return a + b.count }, 0)}}else {return {'count': values.length}}}"
	},
	"userfood-view15": {
		"map": "function(doc){var foods = doc.foods;var time = doc.created_at;if (Date.parse(time) < new Date('2015-12-31') && Date.parse(time) > new Date('2015-01-01')) {foods.forEach(function(f) {emit(doc.user.id, f);});}}",
		"reduce": "function(keys, values, rereduce) {if (rereduce) {return {'count': values.reduce(function(a, b) { return a + b.count }, 0)}}else {return {'count': values.length}}}"
	},
	"userfood-view16": {
		"map": "function(doc){var foods = doc.foods;var time = doc.created_at;if (Date.parse(time) < new Date('2016-12-31') && Date.parse(time) > new Date('2016-01-01')) {foods.forEach(function(f) {emit(doc.user.id, f);});}}",
		"reduce": "function(keys, values, rereduce) {if (rereduce) {return {'count': values.reduce(function(a, b) { return a + b.count }, 0)}}else {return {'count': values.length}}}"
	},
	"userfood-view17": {
		"map": "function(doc){var foods = doc.foods;var time = doc.created_at;if (Date.parse(time) < new Date('2017-12-31') && Date.parse(time) > new Date('2017-01-01')) {foods.forEach(function(f) {emit(doc.user.id, f);});}}",
		"reduce": "function(keys, values, rereduce) {if (rereduce) {return {'count': values.reduce(function(a, b) { return a + b.count }, 0)}}else {return {'count': values.length}}}"
	},
	"userfood-view18": {
		"map": "function(doc){var foods = doc.foods;var time = doc.created_at;if (Date.parse(time) < new Date('2018-12-31') && Date.parse(time) > new Date('2018-01-01')) {foods.forEach(function(f) {emit(doc.user.id, f);});}}",
		"reduce": "function(keys, values, rereduce) {if (rereduce) {return {'count': values.reduce(function(a, b) { return a + b.count }, 0)}}else {return {'count': values.length}}}"
	},
	"foodtags-view14": {
		"map":"function(doc){var foods = doc.foods;var time = doc.created_at;if (Date.parse(time) < new Date('2014-12-31') && Date.parse(time) > new Date('2014-01-01')) {foods.forEach(function(f) {emit(f, doc.user.id);});}}",
		"reduce":"function(keys, values, rereduce) {if (rereduce) {return {'count': values.reduce(function(a, b) { return a + b.count }, 0)}}else {return {'count': values.length}}}"
	},
	"foodtags-view15": {
		"map":"function(doc){var foods = doc.foods;var time = doc.created_at;if (Date.parse(time) < new Date('2015-12-31') && Date.parse(time) > new Date('2015-01-01')) {foods.forEach(function(f) {emit(f, doc.user.id);});}}",
		"reduce":"function(keys, values, rereduce) {if (rereduce) {return {'count': values.reduce(function(a, b) { return a + b.count }, 0)}}else {return {'count': values.length}}}"
	},
	"foodtags-view16": {
		"map":"function(doc){var foods = doc.foods;var time = doc.created_at;if (Date.parse(time) < new Date('2016-12-31') && Date.parse(time) > new Date('2016-01-01')) {foods.forEach(function(f) {emit(f, doc.user.id);});}}",
		"reduce":"function(keys, values, rereduce) {if (rereduce) {return {'count': values.reduce(function(a, b) { return a + b.count }, 0)}}else {return {'count': values.length}}}"
	},
	"foodtags-view17": {
		"map":"function(doc){var foods = doc.foods;var time = doc.created_at;if (Date.parse(time) < new Date('2017-12-31') && Date.parse(time) > new Date('2017-01-01')) {foods.forEach(function(f) {emit(f, doc.user.id);});}}",
		"reduce":"function(keys, values, rereduce) {if (rereduce) {return {'count': values.reduce(function(a, b) { return a + b.count }, 0)}}else {return {'count': values.length}}}"
	},
	"foodtags-view18": {
		"map":"function(doc){var foods = doc.foods;var time = doc.created_at;if (Date.parse(time) < new Date('2018-12-31') && Date.parse(time) > new Date('2018-01-01')) {foods.forEach(function(f) {emit(f, doc.user.id);});}}",
		"reduce":"function(keys, values, rereduce) {if (rereduce) {return {'count': values.reduce(function(a, b) { return a + b.count }, 0)}}else {return {'count': values.length}}}"
	}
}

viewData_timeblock={
	"time-view14" : {
		"map":"function(doc) {var timeslots = ['0-3','3-6','6-9','9-12','12-15','15-18','18-21','21-0'];var foods = doc.foods;var time = doc.created_at;if (Date.parse(time) < new Date('2014-12-31') && Date.parse(time) > new Date('2014-01-01')) {var unixtime = Date.parse(time);var date = new Date(unixtime);var hours = date.getUTCHours();blocknum = Math.floor(hours / 3) + 1;timeblock = 'Timeblock' + blocknum + ' '  + timeslots[blocknum-1];if ( foods.length > 0 ) {emit(timeblock, time);}}}",
		"reduce":"function(keys, values, rereduce) {if (rereduce) {return {'count': values.reduce(function(a, b) { return a + b.count }, 0)}}else {return {'count': values.length}}}"
	},
	"time-view15" : {
		"map":"function(doc) {var timeslots = ['0-3','3-6','6-9','9-12','12-15','15-18','18-21','21-0'];var foods = doc.foods;var time = doc.created_at;if (Date.parse(time) < new Date('2015-12-31') && Date.parse(time) > new Date('2015-01-01')) {var unixtime = Date.parse(time);var date = new Date(unixtime);var hours = date.getUTCHours();blocknum = Math.floor(hours / 3) + 1;timeblock = 'Timeblock' + blocknum + ' '  + timeslots[blocknum-1];if ( foods.length > 0 ) {emit(timeblock, time);}}}",
		"reduce":"function(keys, values, rereduce) {if (rereduce) {return {'count': values.reduce(function(a, b) { return a + b.count }, 0)}}else {return {'count': values.length}}}"
	},
	"time-view16" : {
		"map":"function(doc) {var timeslots = ['0-3','3-6','6-9','9-12','12-15','15-18','18-21','21-0'];var foods = doc.foods;var time = doc.created_at;if (Date.parse(time) < new Date('2016-12-31') && Date.parse(time) > new Date('2016-01-01')) {var unixtime = Date.parse(time);var date = new Date(unixtime);var hours = date.getUTCHours();blocknum = Math.floor(hours / 3) + 1;timeblock = 'Timeblock' + blocknum + ' '  + timeslots[blocknum-1];if ( foods.length > 0 ) {emit(timeblock, time);}}}",
		"reduce":"function(keys, values, rereduce) {if (rereduce) {return {'count': values.reduce(function(a, b) { return a + b.count }, 0)}}else {return {'count': values.length}}}"
	},
	"time-view17" : {
		"map":"function(doc) {var timeslots = ['0-3','3-6','6-9','9-12','12-15','15-18','18-21','21-0'];var foods = doc.foods;var time = doc.created_at;if (Date.parse(time) < new Date('2017-12-31') && Date.parse(time) > new Date('2017-01-01')) {var unixtime = Date.parse(time);var date = new Date(unixtime);var hours = date.getUTCHours();blocknum = Math.floor(hours / 3) + 1;timeblock = 'Timeblock' + blocknum + ' '  + timeslots[blocknum-1];if ( foods.length > 0 ) {emit(timeblock, time);}}}",
		"reduce":"function(keys, values, rereduce) {if (rereduce) {return {'count': values.reduce(function(a, b) { return a + b.count }, 0)}}else {return {'count': values.length}}}"
	},
	"time-view18" : {
		"map":"function(doc) {var timeslots = ['0-3','3-6','6-9','9-12','12-15','15-18','18-21','21-0'];var foods = doc.foods;var time = doc.created_at;if (Date.parse(time) < new Date('2018-12-31') && Date.parse(time) > new Date('2018-01-01')) {var unixtime = Date.parse(time);var date = new Date(unixtime);var hours = date.getUTCHours();blocknum = Math.floor(hours / 3) + 1;timeblock = 'Timeblock' + blocknum + ' '  + timeslots[blocknum-1];if ( foods.length > 0 ) {emit(timeblock, time);}}}",
		"reduce":"function(keys, values, rereduce) {if (rereduce) {return {'count': values.reduce(function(a, b) { return a + b.count }, 0)}}else {return {'count': values.length}}}"
	},
}




def create_design_doc(design, view):
    try:
        melbpast[design] = dict(language='javascript', views=view)
        sydneypast[design] = dict(language='javascript', views=view)
        perthpast[design] = dict(language='javascript', views=view)
        brispast[design] = dict(language='javascript', views=view)
    except:
        del melbpast[design]
        melbpast[design] = dict(language='javascript', views=view)
        del sydneypast[design]
        sydneypast[design] = dict(language='javascript', views=view)
        del perthpast[design]
        perthpast[design] = dict(language='javascript', views=view)
        del brispast[design]
        brispast[design] = dict(language='javascript', views=view)


if __name__ == '__main__':
	create_design_doc('_design/foodtags', viewData_foodtags)
	create_design_doc('_design/timeblock', viewData_timeblock)
	print("done")




