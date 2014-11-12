Meteor.methods({
	
	getMakes: function (time) {
		var v = HTTP.get("http://54.164.222.183:3000/makes.json?last_update="+time);
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.stausCode});
		};
	},
	
	getMake: function (customer_id) {
		var v = HTTP.get("http://54.164.222.183:3000/makes/" + customer_id + ".json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	newMake: function (customer_data) {
		v = HTTP.post("http://54.164.222.183:3000/makes.json", {data: customer_data});
		if (v.statusCode === 201) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	updateMake: function(customer_id, customer_data) {
		console.log(customer_data)
		v = HTTP.put("http://54.164.222.183:3000/makes/" + customer_id + ".json", {data: customer_data});
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
		Modules.insert({name: "Makes", slug: "makes", icon: "fa-user", active: true, admin_only: true, last_update: new Date()})
		var last_update = new Date("01/01/2004")
	}	else {
		var last_update = Modules.findOne({slug: "makes"}).last_update
	}

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
			Modules.update({slug: "makes"}, {$set: {last_update: new Date()}})
			console.log("----------> " + "Done updating makes")
		}	
	});
});