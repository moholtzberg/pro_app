Meteor.startup( function(){
	console.log("starting up models")
	if (Modules.findOne({slug: "models"}) && Modules.findOne({slug: "models"}).last_update) {
		var last_update = Modules.findOne({slug: "models"}).last_update
	} else {
		var last_update = new Date("01/01/2004")
	};
	Meteor.call("getModels", last_update, function(e, r){
		if (!e && r) {
			var a = JSON.parse(r);
			console.log("----------> Total models retrieved from DG " + a.length)
		
			for (var i=0; i < a.length; i++) {
				cust = Models.findOne( {dg_model_id: a[i].dg_model_id} )
				if (cust) {
					if ((cust.dg_last_update < a[i].dg_last_update) || !cust.dg_last_update) {
						console.log("-----------> Updating model " + a[i].model_number + " was updated on " + new Date(a[i].dg_last_update).toLocaleDateString())
						Models.update({_id: cust._id}, {$set: a[i]})
					};
				} else {
					console.log("-----------> Entering model " + a[i].model_number + " was not found in the db")
					Models.insert({dg_model_id: a[i].dg_model_id, model_make_id: a[i].model_make_id, model_number: a[i].model_number, model_description: a[i].model_description, model_active: a[i].model_active, dg_last_update: a[i].dg_last_update})
				}
			}
			Modules.update({_id: Modules.findOne({slug: "models"})._id}, {$set: {last_update: new Date()}})
			console.log("----------> " + "Done updating models")
		}	
	});
	
})