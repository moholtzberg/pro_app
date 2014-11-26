Router.route('customers/new', {
	template: "customers_form",
	action: function () {
		this.render();
	}
});

Router.route('customers/maps', {
	template: "customers_map",
	// waitOn: function(){
	// 	if (navigator.geolocation) {
	// 		navigator.geolocation.getCurrentPosition(function(p) {
	// 			Session.set("myLat", p.coords.latitude);
	// 			Session.set("myLng", p.coords.longitude);
	// 		});
	// 	}
	// },
	// 	var bounds = {
	// 		southWest: [Session.get("myLat") - 0.0155, Session.get("myLng") - 0.05],
	// 		northEast: [Session.get("myLat") + 0.0155, Session.get("myLng") + 0.05]
	// 	}
	// 	if (MapBounds.find().count() < 1) {
	// 		MapBounds.insert(bounds);
	// 	} else {
	// 		MapBounds.update({}, bounds);
	// 	}
		// return Meteor.subscribe("CustomersByGeolocation",  MapBounds.findOne(), "blank")
	// },
	// data: function() {
	// 	return Customers.find()
	// },
	action: function() {
		this.render();
	}
});

Router.route('customers/:id', {
	template: "customers_page",
	waitOn: function() {
		if (this.params) {
			Session.set("recordId", this.params.id)
		};
	},
	data: function() {
		return Customers.findOne({_id: Session.get("recordId")});
	},
	action: function() {
		this.render("contacts_form", {to: "modal1"});
		this.render("activities_form", {to: "modal2"})
		this.render("customers_form", {to: "modal3"})
		this.render();
	}
});

Router.route('customers', {
	template: 'customers_list',
	waitOn: function(){
		console.log("customers")
		if (this.params.query) {
			Session.set("filter", this.params.query.q)
			console.log(Session.get("filter"))
			Session.set("page", this.params.query.page)
		} else {
			Session.set("filter", "a")
			Session.set("page", 1)
		}
	},
	data: function(){
		var per_page = 15
		return Customers.find({customer_name: {$regex: "^"+Session.get("filter")+".*", $options: "i"}}, {sort: {customer_name: 1}, skip: (Session.get("page") - 1) * per_page, limit: per_page})
	},
	action: function() {
		Session.set("recordId", false)
		this.render();
	}
});
