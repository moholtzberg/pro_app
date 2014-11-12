Meteor.methods({
	
	getModels: function (time) {
		var v = HTTP.get("http://54.164.222.183:3000/models.json?last_update="+time);
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.stausCode});
		};
	},
	
	getModel: function (customer_id) {
		var v = HTTP.get("http://54.164.222.183:3000/models/" + customer_id + ".json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	newModel: function (customer_data) {
		v = HTTP.post("http://54.164.222.183:3000/models.json", {data: customer_data});
		if (v.statusCode === 201) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	updateModel: function(customer_id, customer_data) {
		console.log(customer_data)
		v = HTTP.put("http://54.164.222.183:3000/models/" + customer_id + ".json", {data: customer_data});
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
		Modules.insert({name: "Models", slug: "models", icon: "fa-user", active: false, admin_only: true, last_update: new Date()})
	}	else {
		var last_update = Modules.findOne({slug: "models"}).last_update
	}

	Meteor.call("getModels", last_update, function(e, r){
		if (!e && r) {
			var a = JSON.parse(r);
			console.log(a.length)
			for (var i=0; i < a.length; i++) {
				cust = Models.findOne( {dg_model_id: a[i].dg_model_id} )
				if (cust) {
					if ((cust.dg_last_update < a[i].dg_last_update) || !cust.dg_last_update) {
						console.log(cust.dg_last_update + " -->> " + a[i].dg_last_update)
						Models.update({_id: cust._id}, {$set: a[i]})
					};
				} else {
					Models.insert({dg_model_id: a[i].dg_model_id, model_make_id: a[i].model_make_id, model_number: a[i].model_number, model_description: a[i].model_description, model_active: a[i].model_active, dg_last_update: a[i].dg_last_update})
				}
			}
			Modules.update({slug: "models"}, {$set: {last_update: new Date()}})
			console.log("--->> " + "Done updating models")
		}	
	});
	
});