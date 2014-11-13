Meteor.startup(function(){
	
	console.log("starting up equipments")
	
	if (Modules.findOne({slug: "equipments"}) && Modules.findOne({slug: "equipments"}).last_update) {
		var last_update = Modules.findOne({slug: "equipments"}).last_update
	} else {
		var last_update = new Date("01/01/2004")
	};
	
	Meteor.call("getEquipments", last_update,function(e, r){
		if (!e && r) {
			var a = JSON.parse(r);
			console.log("----------> Total equipments retrieved from DG " + a.length)
			
			for (var i=0; i < a.length; i++) {
							cust = Equipments.findOne( {dg_equipment_id: a[i].dg_equipment_id} )
							if (cust) {
								if (cust.dg_last_update < a[i].dg_last_update || !cust.dg_last_update) {
									console.log("-----------> Updating equipment " + a[i].equipment_number + " was updated on " + new Date(a[i].dg_last_update).toLocaleDateString())
									Equipments.update({_id: cust._id}, {$set: a[i]})
								};
							} else {
								console.log("-----------> Entering equipment " + a[i].equipment_number + " was not found in the db")
								Equipments.insert({dg_equipment_id: a[i].dg_equipment_id, dg_customer_id: a[i].dg_customer_id, equipment_number: a[i].equipment_number, equipment_serial: a[i].equipment_serial, equipment_make_id: a[i].equipment_make_id, equipment_model_id: a[i].equipment_model_id, equipment_lease_id: a[i].equipment_lease_id, equipment_install_date: a[i].equipment_install_date, dg_equipment_last_updated_at: a[i].dg_equipment_last_updated_at})
							}
						};
						Modules.update({_id: Modules.findOne({slug: "equipments"})._id}, {$set: {last_update: new Date()}})
			console.log("----------> " + "Done updating equipments")
		};
	});
	
})