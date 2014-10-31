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
	onBeforeAction: function () {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(p) {
				Session.set("myLat", p.coords.latitude);
				Session.set("myLng", p.coords.longitude);
			});
		}
		var bounds = {
			southWest: [Session.get("myLat") - 0.0155, Session.get("myLng") - 0.05],
			northEast: [Session.get("myLat") + 0.0155, Session.get("myLng") + 0.05]
		}
		Meteor.subscribe("CustomersByGeolocation",  bounds, "blank")
	},
	waitOn: function () {

		// return Meteor.subscribe("CustomersByGeolocation",  bounds, "blank")
	},
	action: function () {

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
		return Meteor.subscribe("Customers")
	},
	action: function () {
		Meteor.subscribe("Equipments")
		Meteor.subscribe("Models")
		Meteor.subscribe("Makes")
		Meteor.subscribe("Leases")
		if (this.ready()) {
			Session.set("recordId", this.params.id)
			this.render("nav", {to: "nav"});
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
		return Meteor.subscribe("Customers")
	},
	data: function() {
		var per_page = 15
		return Customers.find({$or:[{name: {$regex: "^"+Session.get("filter")+".*", $options: "i"}}, {sort: {name: 1}}, {"dg_info.CustomerName": {$regex: "^"+Session.get("filter")+".*", $options: "i"}}, {sort: {"dg_info.CustomerName": 1}}]}, {skip: (Session.get("page") - 1) * per_page, limit: per_page})
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