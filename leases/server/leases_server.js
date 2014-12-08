Meteor.methods({
	
	getLeases: function (time) {
		var v = HTTP.get(process.env.REMOTE_URL + "/leases.json?last_update="+time);
		console.log(process.env.REMOTE_URL + "/leases.json?last_update="+time)
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
	
	Leases._ensureIndex( {dg_lease_id: 1}, {lease_end_date: 1}, {lease_start_date: 1})
	
	Leases.find({$or: [{lease_end_date: "Invalid date"}, {lease_end_date: null}, {lease_end_date: false}] }).forEach(function(lease) {
		console.log(lease.lease_start_date)
		Leases.update({_id: lease._id}, {$set: {lease_end_date: lease.end_date()}})
	})
	
	if (!Modules.findOne({slug: "leases"})) {
		Modules.insert({name: "Leases", slug: "leases", icon: "fa-user", active: false, admin_only: true, last_update: new Date("01/01/2004")})
	}
	
});

Meteor.startup( function(){
	
	console.log("starting up leases")
	
	if (Modules.findOne({slug: "leases"}) && Modules.findOne({slug: "leases"}).last_update) {
		var last_update = Modules.findOne({slug: "leases"}).last_update
	} else {
		var last_update = new Date("01/01/2004")
	};
	
	// Meteor.call("getLeases", last_update, function(e, r){
	// 	if (!e && r) {
	// 		var a = JSON.parse(r);
	// 		console.log("----------> Total leases retrieved from DG " + a.length)
	// 
	// 		for (var i=0; i < a.length; i++) {
	// 			cust = Leases.findOne( {dg_lease_id: a[i].dg_lease_id} )
	// 			if (cust) {
	// 				if (cust.dg_last_update < a[i].dg_last_update || !cust.dg_last_update) {
	// 					console.log("-----------> Updating lease " + a[i].lease_number + " was updated on " + new Date(a[i].dg_last_update).toISOString())
	// 					Leases.update({_id: cust._id}, {$set: a[i]})
	// 				};
	// 			} else {
	// 				console.log("-----------> Entering lease " + a[i].lease_number + " was not found in the db")
	// 				Leases.insert({dg_lease_id: a[i].dg_lease_id, lease_customer_id: a[i].lease_customer_id, lease_number: a[i].lease_number, lease_start_date: a[i].lease_start_date, lease_end_date: moment(a[i].lease_start_date).add(a[i].lease_term, "months").toISOString(), lease_payment: a[i].lease_payment, lease_term: a[i].lease_term, dg_leasing_company_id: a[i].dg_leasing_company_id, dg_last_update: a[i].dg_last_update})
	// 			}
	// 		};
	// 		Modules.update({_id: Modules.findOne({slug: "leases"})._id}, {$set: {last_update: new Date()}})
	// 		console.log("----------> " + "Done updating leases")
	// 	};
	// });
	
})