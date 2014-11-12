Meteor.methods({
	
	getEquipments: function (time) {
		console.log(time)
		var v = HTTP.get("http://54.164.222.183:3000/equipments.json?last_update="+time);
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.stausCode});
		};
	},
	
	getEquipment: function (customer_id) {
		var v = HTTP.get("http://54.164.222.183:3000/equipments/" + customer_id + ".json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	newEquipment: function (customer_data) {
		v = HTTP.post("http://54.164.222.183:3000/equipment.json", {data: customer_data});
		if (v.statusCode === 201) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	updateEquipment: function(customer_id, customer_data) {
		console.log(customer_data)
		v = HTTP.put("http://54.164.222.183:3000/equipment/" + customer_id + ".json", {data: customer_data});
		if (v.statusCode === 202) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	}
	
});

Meteor.publish("Equipments", function() {
	return Equipments.find();
});

Meteor.startup( function(){
	
	Equipments._ensureIndex( {dg_equipment_id: 1})
	
	if (!Modules.findOne({slug: "equipments"})) {
		Modules.insert({name: "Equipments", slug: "equipments", icon: "fa-user", active: false, admin_only: true, last_update: new Date()})
	} else {
		var last_update = Modules.findOne({slug: "equipments"}).last_update
	}

	Meteor.call("getEquipments", last_update,function(e, r){
		if (!e) {
			a = JSON.parse(r);
			if (a.length > Equipments.find().count()) {
				console.log("Customers is grater than " + Equipments.find().count())
			};
			for (var i=0; i < a.length; i++) {
							cust = Equipments.findOne( {dg_equipment_id: a[i].dg_equipment_id} )
							if (cust) {
								if (cust.dg_equipment_last_updated_at < a[i].dg_equipment_last_updated_at || !cust.dg_equipment_last_updated_at) {
									console.log(cust.equipment_number + " is updating")
									Equipments.update({_id: cust._id}, {$set: a[i]})
								};
							} else {
								// console.log("-->> " + a[i].dg_equipment_id + " >> " + a[i].equipment_number + " was not found in the db!")
								Equipments.insert({dg_equipment_id: a[i].dg_equipment_id, dg_customer_id: a[i].dg_customer_id, equipment_number: a[i].equipment_number, equipment_serial: a[i].equipment_serial, equipment_make_id: a[i].equipment_make_id, equipment_model_id: a[i].equipment_model_id, equipment_lease_id: a[i].equipment_lease_id, equipment_install_date: a[i].equipment_install_date, dg_equipment_last_updated_at: a[i].dg_equipment_last_updated_at})
							}
						};
						Modules.update({slug: "equipments"}, {$set: {last_update: new Date()}})
			console.log("--->> " + "Done updating equipments")
		};
	});
});