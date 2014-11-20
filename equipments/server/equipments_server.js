Meteor.methods({
	
	getEquipments: function (time) {
		var v = HTTP.get(process.env.REMOTE_URL + "/equipments.json?last_update="+time);
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.stausCode});
		};
	},
	
	getEquipment: function (customer_id) {
		var v = HTTP.get(process.env.REMOTE_URL + "/equipments/" + customer_id + ".json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	newEquipment: function (customer_data) {
		v = HTTP.post(process.env.REMOTE_URL + "/equipment.json", {data: customer_data});
		if (v.statusCode === 201) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	updateEquipment: function(customer_id, customer_data) {
		v = HTTP.put(process.env.REMOTE_URL + "/equipment/" + customer_id + ".json", {data: customer_data});
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
	
	Equipments._ensureIndex( {dg_equipment_id: 1}, {unique: true})
	
	if (!Modules.findOne({slug: "equipments"})) {
		Modules.insert({name: "Equipments", slug: "equipments", icon: "fa-user", active: false, admin_only: true, last_update: new Date("01/01/2004")})
	}
	
});