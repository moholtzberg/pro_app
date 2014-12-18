Meteor.methods({
	
	getCustomers: function (time) {
		try {
			var v = HTTP.get(process.env.REMOTE_URL + "/customers.json?last_update="+time);
			console.log(process.env.REMOTE_URL + "/customers.json?last_update="+time)
			if (v.statusCode === 200) {
				return v.content;
			} else {
				throw new Meteor.Error({code: v.stausCode});
			};
		} catch (err) {
			console.log("customers/server/customers_server.js:12 --->> " + err);
		}
		
	},
	
	getCustomer: function (customer_id) {
		var v = HTTP.get(process.env.REMOTE_URL + "/customers/" + customer_id + ".json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	newCustomer: function (customer_data) {
		v = HTTP.post(process.env.REMOTE_URL + "/customers.json", {data: customer_data});
		if (v.statusCode === 201) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	updateCustomer: function(customer_id, customer_data) {
		console.log(customer_data)
		v = HTTP.put(process.env.REMOTE_URL + "/customers/" + customer_id + ".json", {data: customer_data});
		if (v.statusCode === 202) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	}
	
});

Meteor.publish("Customers", function(filter, group, page, per_page){
	var filter = (filter == undefined) ? "a" : filter
	var group = (group == undefined) ? null : group
	var page = (page == undefined) ? 1 : page
	var per_page = (per_page == undefined) ? 15 : per_page
	console.log(filter + " " + group + " " + page + " " + per_page)
	var user = Meteor.users.findOne(this.userId)
	if (user) {
		if (user.profile && user.profile.is_admin) {
			customers = Customers.find({$and: [{customer_group_id: {$in: [group]}}, {customer_name: {$regex: "^"+filter+".*", $options: "i"}}]}, {sort: {customer_name: 1}, skip: (page - 1) * per_page, limit: per_page})
		} else {
			if (Customers.find({customer_user_id: {$in: [user._id]}}).count() > 0) {
				customers = Customers.find({$and: [{customer_user_id: {$in: [user._id]}}, {customer_group_id: {$in: [group]}}, {customer_name: {$regex: "^"+filter+".*", $options: "i"}}]}, {sort: {customer_name: 1}, skip: (page - 1) * per_page, limit: per_page})
			}
		}
	}
	console.log(customers.count())
	return customers;
});

Meteor.publish("CustomerById", function(id){
	var user = Meteor.users.findOne(this.userId)
	if (user) {
		if (user.profile && user.profile.is_admin) {
			customer = Customers.find({_id: id})
		} else {
			customer = Customers.find({$and: [{_id: id}, {customer_user_id: {$in: [user._id]}}]})
		}
	}
	return customer;
});

Meteor.publish("CustomersByGeolocation", function(bounds) {
	var filter = (filter == undefined || false) ? null : filter
	console.log(filter)
	var user = Meteor.users.findOne(this.userId)
	console.log(bounds.southWest)
	console.log(bounds.northEast)
	if (bounds) {
	// if (bounds && (!isNaN(bounds.southWest)) && (!isNaN(bounds.northEast))) {
		if (user) {
			if (user.profile && user.profile.is_admin) {
				console.log("customers map found --->> " + Customers.find({loc: {$within: {$box: [ bounds.southWest, bounds.northEast ] }}}).count())
				return Customers.find({loc: {$within: {$box: [ bounds.southWest, bounds.northEast ] }}}, {limit: 50})
			} else {
				return Customers.find({$and: [{user_id: user._id}, {loc: {$within: {$box: [ bounds.southWest, bounds.northEast ] }}}]}, {limit: 50})
			}
		}
	}
});

Meteor.startup( function(){
	
	Customers._ensureIndex( { loc : "2d" } );
	Customers._ensureIndex( {dg_customer_id: 1})
	// Customers._ensureIndex( {dg_customer_id: 1}, { unique: true })
	
	if (!Modules.findOne({slug: "customers"})) {
		Modules.insert({name: "Customers", slug: "customers", icon: "fa-user", active: true, admin_only: false, last_update: new Date("01/01/2004")})
	}
	
	// Customers.find({$and: [ {loc: {$exists:1}}, {$or: [{"loc.lat": null},{"loc.lng": null}]} ] }).forEach(function(f){
	// 	f.UpdateGeoLocation()
	// })
	// 
	// Customers.find({$and: [{customer_active: true}, {loc: null}]}).forEach(function(a){
	// 	a.UpdateGeoLocation()
	// })

});