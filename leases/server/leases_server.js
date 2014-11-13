Meteor.methods({
	
	getLeases: function (time) {
		var v = HTTP.get(process.env.REMOTE_URL + "/leases.json?last_update="+time);
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.stausCode});
		};
	},
	
	getLease: function (customer_id) {
		var v = HTTP.get(process.env.REMOTE_URL + "/leases/" + customer_id + ".json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	newLease: function (customer_data) {
		v = HTTP.post(process.env.REMOTE_URL + "/leases.json", {data: customer_data});
		if (v.statusCode === 201) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	updateLease: function(customer_id, customer_data) {
		console.log(customer_data)
		v = HTTP.put(process.env.REMOTE_URL + "/leases/" + customer_id + ".json", {data: customer_data});
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
	
	Leases._ensureIndex( {dg_lease_id: 1})
	
	if (!Modules.findOne({slug: "leases"})) {
		Modules.insert({name: "Leases", slug: "leases", icon: "fa-user", active: false, admin_only: true, last_update: new Date("01/01/2004")})
	}
	
});