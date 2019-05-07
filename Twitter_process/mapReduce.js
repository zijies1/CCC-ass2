


// get food 
// map reduce function 1
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



// get user id 
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


