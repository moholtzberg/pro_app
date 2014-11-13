

Meteor.startup( function(){
	
	console.log("starting up leases")
	
	if (Modules.findOne({slug: "leases"}) && Modules.findOne({slug: "leases"}).last_update) {
		var last_update = Modules.findOne({slug: "leases"}).last_update
	} else {
		var last_update = new Date("01/01/2004")
	};
	
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
			Modules.update({_id: Modules.findOne({slug: "leases"})._id}, {$set: {last_update: new Date()}})
			console.log("----------> " + "Done updating leases")
		};
	});
	
})