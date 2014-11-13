Meteor.startup( function(){
	
	console.log("starting up makes")
	
	if (Modules.findOne({slug: "makes"}) && Modules.findOne({slug: "makes"}).last_update) {
		var last_update = Modules.findOne({slug: "makes"}).last_update
	} else {
		var last_update = new Date("01/01/2004")
	};
	
	Meteor.call("getMakes", last_update, function(e, r){
		if (!e && r) {
			var a = JSON.parse(r);
			console.log("----------> Total makes retrieved from DG " + a.length)

			for (var i=0; i < a.length; i++) {
				cust = Makes.findOne( {dg_make_id: a[i].dg_make_id} )
				if (cust) {
					if ((cust.dg_last_update < a[i].dg_last_update) || !cust.dg_last_update) {
						console.log("-----------> Updating make " + a[i].make_name + " was updated on " + new Date(a[i].dg_last_update).toLocaleDateString())
						Makes.update({_id: cust._id}, {$set: a[i]})
					};
				} else {
					console.log("-----------> Entering make " + a[i].make_name + " was not found in the db")
					Makes.insert({dg_make_id: a[i].dg_make_id, make_name: a[i].make_name, make_active: a[i].make_active, dg_last_update: a[i].dg_last_update})
				}
			}
			Modules.update({_id: Modules.findOne({slug: "makes"})._id}, {$set: {last_update: new Date()}})
			console.log("----------> " + "Done updating makes")
		}	
	});
	
})