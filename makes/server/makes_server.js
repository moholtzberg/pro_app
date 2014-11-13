Meteor.methods({
	
	getMakes: function (time) {
		var v = HTTP.get(process.env.REMOTE_URL + "/makes.json?last_update="+time);
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.stausCode});
		};
	},
	
	getMake: function (customer_id) {
		var v = HTTP.get(process.env.REMOTE_URL + "/makes/" + customer_id + ".json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	newMake: function (customer_data) {
		v = HTTP.post(process.env.REMOTE_URL + "/makes.json", {data: customer_data});
		if (v.statusCode === 201) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	updateMake: function(customer_id, customer_data) {
		console.log(customer_data)
		v = HTTP.put(process.env.REMOTE_URL + "/makes/" + customer_id + ".json", {data: customer_data});
		if (v.statusCode === 202) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	}
	
});

Meteor.publish("Makes", function() {
	return Makes.find();
});

Meteor.startup( function(){
	
	Makes._ensureIndex( {dg_make_id: 1})
	
	if (!Modules.findOne({slug: "makes"})) {
		Modules.insert({name: "Makes", slug: "makes", icon: "fa-user", active: true, admin_only: true, last_update: new Date("01/01/2004")})
	}

});