Meteor.methods({
	
	getLeases: function () {
		var v = HTTP.get("http://127.0.0.1:3000/leases.json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.stausCode});
		};
	},
	
	getLease: function (customer_id) {
		var v = HTTP.get("http://127.0.0.1:3000/leases/" + customer_id + ".json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	newLease: function (customer_data) {
		v = HTTP.post("http://127.0.0.1:3000/leases.json", {data: customer_data});
		if (v.statusCode === 201) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	updateLease: function(customer_id, customer_data) {
		console.log(customer_data)
		v = HTTP.put("http://127.0.0.1:3000/leases/" + customer_id + ".json", {data: customer_data});
		if (v.statusCode === 202) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	}
	
});

Meteor.publish("Leases", function() {
	return Leases.find();
});

Meteor.startup( function(){

	Meteor.call("getLeases", function(e, r){
		if (!e) {
			console.log(r)
			a = JSON.parse(r);
			for (var i=0; i < a.length; i++) {
				cust = Leases.findOne( {"dg_info.LeaseID": a[i].LeaseID} )
				if (cust) {
					if (cust.dg_info.LastUpdate < a[i].LastUpdate || !cust.dg_info.LastUpdate) {
						Leases.update({_id: cust._id}, {$set: {dg_info: a[i]}})
					};
				} else {
					Leases.insert( {dg_info: a[i]} )
				}
			};
		};
	});
});