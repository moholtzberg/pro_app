Meteor.methods({
	
	getLeases: function (time) {
		var v = HTTP.get("http://54.164.222.183:3000/leases.json?last_update="+time);
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.stausCode});
		};
	},
	
	getLease: function (customer_id) {
		var v = HTTP.get("http://54.164.222.183:3000/leases/" + customer_id + ".json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	newLease: function (customer_data) {
		v = HTTP.post("http://54.164.222.183:3000/leases.json", {data: customer_data});
		if (v.statusCode === 201) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	updateLease: function(customer_id, customer_data) {
		console.log(customer_data)
		v = HTTP.put("http://54.164.222.183:3000/leases/" + customer_id + ".json", {data: customer_data});
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
		Modules.insert({name: "Leases", slug: "leases", icon: "fa-user", active: false, admin_only: true, last_update: new Date()})
		var last_update = new Date("01/01/2004")
	} else {
		var last_update = Modules.findOne({slug: "leases"}).last_update
	}

	Meteor.call("getLeases", last_update, function(e, r){
		if (!e && r) {
			var a = JSON.parse(r);
			console.log("----------> Total leases retrieved from DG " + a.length)
			
			for (var i=0; i < a.length; i++) {
				cust = Leases.findOne( {dg_lease_id: a[i].dg_lease_id} )
				if (cust) {
					if (cust.dg_last_update < a[i].dg_last_update || !cust.dg_last_update) {
						console.log("-----------> Updating lease " + a[i].lease_number + " was updated on " + new Date(a[i].dg_last_update).toLocaleDateString())
						Leases.update({_id: cust._id}, {$set: a[i]})
					};
				} else {
					console.log("-----------> Entering lease " + a[i].lease_number + " was not found in the db")
					Leases.insert({dg_lease_id: a[i].dg_lease_id, lease_customer_id: a[i].lease_customer_id, lease_number: a[i].lease_number, lease_payment: a[i].lease_payment, lease_term: a[i].lease_term, dg_leasing_company_id: a[i].dg_leasing_company_id, dg_lease_last_updated_at: a[i].dg_lease_last_updated_at})
				}
			};
			Modules.update({slug: "leases"}, {$set: {last_update: new Date()}})
			console.log("----------> " + "Done updating leases")
		};
	});
});