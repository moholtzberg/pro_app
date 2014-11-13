Meteor.methods({
	
	getCustomers: function (time) {
		try {
			var v = HTTP.get("http://54.164.222.183:3000/customers.json?last_update="+time);
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
		var v = HTTP.get("http://54.164.222.183:3000/customers/" + customer_id + ".json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	newCustomer: function (customer_data) {
		v = HTTP.post("http://54.164.222.183:3000/customers.json", {data: customer_data});
		if (v.statusCode === 201) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	updateCustomer: function(customer_id, customer_data) {
		console.log(customer_data)
		v = HTTP.put("http://54.164.222.183:3000/customers/" + customer_id + ".json", {data: customer_data});
		if (v.statusCode === 202) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	}
	
});

Meteor.publish("Customers", function(){
	var user = Meteor.users.findOne(this.userId)
	if (user && user.profile && user.profile.is_admin) {
		return Customers.find({});
	} else {
		return Customers.find({user_id: user._id});
	};
});

Meteor.publish("CustomersByGeolocation", function(bounds, filter) {
	console.log(bounds)
	console.log(filter)
	var user = Meteor.users.findOne(this.userId)
	if (bounds && bounds.southWest && bounds.northEast) {
		if (user && user.profile && user.profile.is_admin) {
			console.log("customers map found --->> " + Customers.find({loc: {$within: {$box: [ bounds.southWest, bounds.northEast ] }}}).count())
			return Customers.find({loc: {$within: {$box: [ bounds.southWest, bounds.northEast ] }}}, {limit: 10})
		} else {
			return Customers.find({$and: [{user_id: user._id}, {loc: {$within: {$box: [ bounds.southWest, bounds.northEast ] }}}]}, {limit: 10})
		};
		
	};
});

Meteor.startup( function(){
	
	Customers._ensureIndex( { loc : "2d" } );
	Customers._ensureIndex( {dg_customer_id: 1})
	
	if (!Modules.findOne({slug: "customers"})) {
		Modules.insert({name: "Customers", slug: "customers", icon: "fa-user", active: true, admin_only: false, last_update: new Date()})
		var last_update = new Date("01/01/2004")
	} else {
		var last_update = Modules.findOne({slug: "customers"}).last_update
	}
	
 	// Meteor.call("getCustomers", last_update, function(e, r){
 	// 		if (!e && r) {
 	// 			var a = JSON.parse(r);
 	// 			console.log("----------> Total customers retrieved from DG " + a.length)
 	// 			
 	// 			for (var i=0; i < a.length; i++) {
 	// 				cust = Customers.findOne( {dg_customer_id: a[i].dg_customer_id} )
 	// 				if (cust) {
 	// 					if ((cust.dg_last_update < a[i].dg_last_update) || !cust.dg_last_update) {
 	// 						console.log("-----------> Updating customer " + a[i].dg_customer_number + " was updated on " + new Date(a[i].dg_last_update).toLocaleDateString())
 	// 						Customers.update({_id: cust._id}, {$set: a[i]})
 	// 						Customers.findOne({_id: cust._id}).UpdateGeoLocation();
 	// 					};
 	// 				} else {
 	// 					console.log("-----------> Entering customer " + a[i].dg_customer_number + " was not found in the db")
 	// 					Customers.insert({dg_customer_id: a[i].dg_customer_id, dg_customer_number: a[i].dg_customer_number, dg_customer_sales_rep_id: a[i].dg_customer_sales_rep_id, dg_customer_last_updated_at: a[i].dg_customer_last_updated_at,customer_name: a[i].customer_name, customer_address: a[i].customer_address, customer_city: a[i].customer_city, customer_state: a[i].customer_state, customer_zip: a[i].customer_zip, customer_phone: a[i].customer_phone, customer_fax: a[i].customer_fax, customer_active: a[i].customer_active, customer_prospect: a[i].customer_prospect})
 	// 				}
 	// 			}
 	// 			Modules.update({slug: "customers"}, {$set: {last_update: new Date()}})
 	// 			console.log("----------> " + "Done updating customers")
 	// 		}	
 	// 	});
 	// 	
 	// 	Customers.find({user_id: Meteor.userId}).forEach(function(a){
 	// 		a.GeoLocation()
 	// 	})

});