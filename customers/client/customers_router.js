Router.route('customers/new', {
	// layoutTemplate: "application_layout",
	template: "customers_form",
	action: function () {
		if (this.ready()) {
			this.render("nav", {to: "nav"});
			this.render();
		} else {
			this.render("loading")
		};
	}
});

Router.route('customers/maps', {
	// layoutTemplate: 'application_layout',
	template: 'customers_map',
	// onBeforeAction: function () {
		// custSub.stop()
		// if (navigator.geolocation) {
		// 	navigator.geolocation.getCurrentPosition(function(p) {
		// 		Session.set("myLat", p.coords.latitude);
		// 		Session.set("myLng", p.coords.longitude);
		// 	});
		// }
		// var bounds = {
		// 	southWest: [Session.get("myLat") - 0.0155, Session.get("myLng") - 0.05],
		// 	northEast: [Session.get("myLat") + 0.0155, Session.get("myLng") + 0.05]
		// }
		// 
		// if (MapBounds.find().count() < 1) {
		// 	MapBounds.insert(bounds);
		// } else {
		// 	MapBounds.update({}, bounds);
		// }
		// 
		// Meteor.subscribe("CustomersByGeolocation",  MapBounds.findOne(), "blank")
	// },
	waitOn: function () {
		// return Meteor.subscribe("CustomersByGeolocation",  MapBounds.findOne(), "blank")
	},
	action: function () {
		// var bounds = {
		// 	southWest: [Session.get("myLat") - 0.0155, Session.get("myLng") - 0.05],
		// 	northEast: [Session.get("myLat") + 0.0155, Session.get("myLng") + 0.05]
		// }
		// 
		// if (MapBounds.find().count() < 1) {
		// 	MapBounds.insert(bounds);
		// } else {
		// 	MapBounds.update({}, bounds);
		// }
		
		// Meteor.subscribe("CustomersByGeolocation",  MapBounds.findOne(), "blank")
		if (this.ready()) {
			this.render("nav", {to: "nav"});
			this.render();
		} else {
			this.render("loading")
		}	
	}
});

Router.route('customers/:id', {
	// layoutTemplate: "application_layout",
	template: "customers_page",
	waitOn: function () {
		// return Meteor.subscribe("Customers")
	},
	action: function () {
		if (this.ready()) {
			Session.set("recordId", this.params.id)
			this.render("nav", {to: "nav"});
			this.render("contacts_form", {to: "modal1"});
			this.render();
		} else {
			this.render("loading")
		};
	}
});

Router.route('customers', {
	// layoutTemplate: 'application_layout',
	template: 'customers_list',
	waitOn: function () {
		if (this.params) {
			Session.set("filter", this.params.q)
			Session.set("page", this.params.page)
		} else {
			Session.set("filter", "a")
			Session.set("page", 1)
		};
		// return Meteor.subscribe("Customers")
	},
	data: function() {
		var per_page = 15
		console.log(per_page)
		return Customers.find({customer_name: {$regex: "^"+Session.get("filter")+".*", $options: "i"}}, {sort: {customer_name: 1}, skip: (Session.get("page") - 1) * per_page, limit: per_page})
	},
	action: function () {
		if (this.ready()) {
			Session.set("recordId", false)
			this.render("nav", {to: "nav"});
			this.render();
		} else {
			this.render("loading")
		};
	}
});