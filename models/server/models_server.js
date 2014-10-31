Meteor.methods({
	
	getModels: function () {
		var v = HTTP.get("http://127.0.0.1:3000/models.json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.stausCode});
		};
	},
	
	getModel: function (customer_id) {
		var v = HTTP.get("http://127.0.0.1:3000/models/" + customer_id + ".json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	newModel: function (customer_data) {
		v = HTTP.post("http://127.0.0.1:3000/models.json", {data: customer_data});
		if (v.statusCode === 201) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	updateModel: function(customer_id, customer_data) {
		console.log(customer_data)
		v = HTTP.put("http://127.0.0.1:3000/models/" + customer_id + ".json", {data: customer_data});
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

	Meteor.call("getModels", function(e, r){
		if (!e) {
			console.log(r)
			a = JSON.parse(r);
			for (var i=0; i < a.length; i++) {
				cust = Models.findOne( {"dg_info.ModelID": a[i].ModelID} )
				if (cust) {
					if (cust.dg_info.LastUpdate < a[i].LastUpdate || !cust.dg_info.LastUpdate) {
						Models.update({_id: cust._id}, {$set: {dg_info: a[i]}})
					};
				} else {
					Models.insert( {dg_info: a[i]} )
				}
			};
		};
	});
});