Meteor.startup( function(){
	
	console.log("starting up customers")
	
	if (Modules.findOne({slug: "customers"}) && Modules.findOne({slug: "customers"}).last_update) {
		var last_update = Modules.findOne({slug: "customers"}).last_update
	} else {
		var last_update = new Date("01/01/2004")
	};
	
	Meteor.call("getCustomers", last_update, function(e, r){
			if (!e && r) {
				var a = JSON.parse(r);
				console.log("----------> Total customers retrieved from DG " + a.length)
				
				for (var i=0; i < a.length; i++) {
					cust = Customers.findOne( {dg_customer_id: a[i].dg_customer_id} )
					if (cust) {
						if ((cust.dg_last_update < a[i].dg_last_update) || !cust.dg_last_update) {
							console.log("-----------> Updating customer " + a[i].dg_customer_number + " was updated on " + new Date(a[i].dg_last_update).toLocaleDateString())
							Customers.update({_id: cust._id}, {$set: a[i]})
							Customers.findOne({_id: cust._id}).UpdateGeoLocation();
						};
					} else {
						console.log("-----------> Entering customer " + a[i].dg_customer_number + " was not found in the db")
						Customers.insert({dg_customer_id: a[i].dg_customer_id, dg_customer_number: a[i].dg_customer_number, dg_customer_sales_rep_id: a[i].dg_customer_sales_rep_id, dg_customer_last_updated_at: a[i].dg_customer_last_updated_at,customer_name: a[i].customer_name, customer_address: a[i].customer_address, customer_city: a[i].customer_city, customer_state: a[i].customer_state, customer_zip: a[i].customer_zip, customer_phone: a[i].customer_phone, customer_fax: a[i].customer_fax, customer_active: a[i].customer_active, customer_prospect: a[i].customer_prospect})
					}
				}
				Modules.update({_id: Modules.findOne({slug: "customers"})._id}, {$set: {last_update: new Date()}})
				console.log("----------> " + "Done updating customers")
			}	
		});
	
})