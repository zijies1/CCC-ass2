/*
	MapReduce file
*/


/* 
	function1: group by food
	desc: find out how many tweets about all different kinds of food are posted 
*/
// map function
function(doc) {
	var foods = doc.foodtags;
	foods.forEach(function(f) {
		emit(f, doc.user.id);
	});
}
// reduce function
function(keys, values, rereduce) {
	if (rereduce) {
		return {
		  'count': values.reduce(function(a, b) { return a + b.count }, 0)
		}
	}
	else {
		return {
		  'count': values.length
		}
	}
}

/* 
	function2: group by user id 
	desc: find out how many 'gluttony tweets', each unique twitter user has posted in a given year
*/
// map function 
function(doc) {
	var foods = doc.foodtags;
	foods.forEach(function(f) {
		emit(doc.user.id, f);
	});
}
// reduce
function(keys, values, rereduce) {
	if (rereduce) {
		return {
		  'count': values.reduce(function(a, b) { return a + b.count }, 0)
		}
	}
	else {
		return {
		  'count': values.length
		}
	}
}

/*
	function3: group by time
	desc: find out 
*/
// map function
function(doc) {
	var timeslots = ["0-3","3-6","6-9","9-12","12-15","15-18","18-21","21-0"]

	var time = doc.created_at;
	var unixtime = Date.parse(time);
	var date = new Date(unixtime);
	var hours = date.getUTCHours();

	blocknum = Math.floor(hours / 3) + 1;
	timeblock = "Timeblock" + blocknum + " " + timeslots[blocknum-1];

	emit(timeblock, time);
}
// reduce
function(keys, values, rereduce) {
	if (rereduce) {
		return {
		  'count': values.reduce(function(a, b) { return a + b.count }, 0)
		}
	}
	else {
		return {
		  'count': values.length
		}
	}
}

