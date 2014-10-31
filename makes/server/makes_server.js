Meteor.methods({
	
	getMakes: function () {
		var v = HTTP.get("http://127.0.0.1:3000/makes.json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.stausCode});
		};
	},
	
	getMake: function (customer_id) {
		var v = HTTP.get("http://127.0.0.1:3000/makes/" + customer_id + ".json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	newMake: function (customer_data) {
		v = HTTP.post("http://127.0.0.1:3000/makes.json", {data: customer_data});
		if (v.statusCode === 201) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	updateMake: function(customer_id, customer_data) {
		console.log(customer_data)
		v = HTTP.put("http://127.0.0.1:3000/makes/" + customer_id + ".json", {data: customer_data});
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

	Meteor.call("getMakes", function(e, r){
		if (!e) {
			console.log(r)
			a = JSON.parse(r);
			for (var i=0; i < a.length; i++) {
				cust = Makes.findOne( {"dg_info.MakeID": a[i].MakeID} )
				if (cust) {
					if (cust.dg_info.LastUpdate < a[i].LastUpdate || !cust.dg_info.LastUpdate) {
						Makes.update({_id: cust._id}, {$set: {dg_info: a[i]}})
					};
				} else {
					Makes.insert( {dg_info: a[i]} )
				}
			};
		};
	});
});