Meteor.methods({
	
	getCustomers: function () {
		try {
			var v = HTTP.get("http://127.0.0.1:3000/customers.json");
			if (v.statusCode === 200) {
				return v.content;
			} else {
				throw new Meteor.Error({code: v.stausCode});
			};
		} catch (err) {
			console.log("=======XXXXXXX" + err);
		}
		
	},
	
	getCustomer: function (customer_id) {
		var v = HTTP.get("http://127.0.0.1:3000/customers/" + customer_id + ".json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	newCustomer: function (customer_data) {
		v = HTTP.post("http://127.0.0.1:3000/customers.json", {data: customer_data});
		if (v.statusCode === 201) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	updateCustomer: function(customer_id, customer_data) {
		console.log(customer_data)
		v = HTTP.put("http://127.0.0.1:3000/customers/" + customer_id + ".json", {data: customer_data});
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
		return Customers.find({}, {fields: {customer_name: 1, customer_address: 1, customer_city: 1, customer_state: 1, customer_zip: 1, customer_phone:1, "dg_info.CustomerID": 1, "dg_info.CustomerName": 1, "dg_info.Address": 1, "dg_info.City": 1, "dg_info.State": 1, "dg_info.Zip": 1, "dg_info.Active": 1, "dg_info.Phone1": 1, loc: 1}});
	} else {
		return Customers.find({user_id: user._id}, {fields: {customer_name: 1, customer_address: 1, customer_city: 1, customer_state: 1, customer_zip: 1, customer_phone:1, "dg_info.CustomerID": 1, "dg_info.CustomerName": 1, "dg_info.Address": 1, "dg_info.City": 1, "dg_info.State": 1, "dg_info.Zip": 1, "dg_info.Active": 1, "dg_info.Phone1": 1, loc: 1}});
	};
});


Meteor.publish("CustomersByGeolocation", function(bounds, filter) {
	var user = Meteor.users.findOne(this.userId)
	Customers._ensureIndex( { loc : "2d" } );
	
	if (bounds && bounds.southWest && bounds.northEast) {
		if (user && user.profile && user.profile.is_admin) {
			return Customers.find({loc: {$within: {$box: [ bounds.southWest, bounds.northEast ] }}}, {limit: 10})
		} else {
			return Customers.find({$and: [{user_id: user._id}, {loc: {$within: {$box: [ bounds.southWest, bounds.northEast ] }}}]}, {limit: 10})
		};
		
	};
});

Meteor.startup( function(){
	Meteor.call("getCustomers", function(e, r){
		if (!e) {
			var a = JSON.parse(r);
			for (var i=0; i < a.length; i++) {
				cust = Customers.findOne( {"dg_info.CustomerID": a[i].CustomerID} )
				if (cust) {
					if (cust.dg_info.LastUpdate < a[i].LastUpdate || !cust.dg_info.LastUpdate) {
						Customers.update({_id: cust._id}, {$set: {dg_info: a[i]}})
						Customers.findOne({_id: cust._id}).UpdateGeoLocation();
					};
				} else {
					Customers.insert( {dg_info: a[i]} )};
				};
			};
		
	});
	Customers.find({user_id: Meteor.userId}).forEach(function(a){
		a.GeoLocation()
	})

});