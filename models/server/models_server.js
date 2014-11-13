Meteor.methods({
	
	getModels: function (time) {
		var v = HTTP.get(process.env.REMOTE_URL + "/models.json?last_update="+time);
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.stausCode});
		};
	},
	
	getModel: function (customer_id) {
		var v = HTTP.get(process.env.REMOTE_URL + "/models/" + customer_id + ".json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	newModel: function (customer_data) {
		v = HTTP.post(process.env.REMOTE_URL + "/models.json", {data: customer_data});
		if (v.statusCode === 201) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	updateModel: function(customer_id, customer_data) {
		console.log(customer_data)
		v = HTTP.put(process.env.REMOTE_URL + "/models/" + customer_id + ".json", {data: customer_data});
		if (v.statusCode === 202) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	}
	
});

Meteor.publish("Models", function() {
	return Models.find();
});

Meteor.startup( function(){
	
	Models._ensureIndex( {dg_model_id: 1})
	
	if (!Modules.findOne({slug: "models"})) {
		Modules.insert({name: "Models", slug: "models", icon: "fa-user", active: false, admin_only: true, last_update: new Date("01/01/2004")})
	}
	
});