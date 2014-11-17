Router.route('customers/new', {
	template: "customers_form",
	action: function () {
		if (!Meteor.loggingIn() && !Meteor.user()) {
			this.redirect('/login');
		} else {
			if (this.ready()) {
				this.render("nav", {to: "nav"});
				this.render();
			} else {
				this.render("loading")
			};
		}
	}
});

Router.route('customers/maps', {
	template: 'customers_map',
	// waitOn: function () {
	// 		if (navigator.geolocation) {
	// 			navigator.geolocation.getCurrentPosition(function(p) {
	// 				Session.set("myLat", p.coords.latitude);
	// 				Session.set("myLng", p.coords.longitude);
	// 			});
	// 		}
	// 		var bounds = {
	// 			southWest: [Session.get("myLat") - 0.0155, Session.get("myLng") - 0.05],
	// 			northEast: [Session.get("myLat") + 0.0155, Session.get("myLng") + 0.05]
	// 		}
	// 		if (MapBounds.find().count() < 1) {
	// 			MapBounds.insert(bounds);
	// 		} else {
	// 			MapBounds.update({}, bounds);
	// 		}
	// 	return Meteor.subscribe("CustomersByGeolocation",  MapBounds.findOne(), "blank")
	// },
	action: function () {
		if (!Meteor.loggingIn() && !Meteor.user()) {
			this.redirect('/login');
		} else {
			if (this.ready()) {
				this.render("nav", {to: "nav"});
				this.render();
			} else {
				this.render("loading")
			}	
		}
	}
});

Router.route('customers/:id', {
	template: "customers_page",
	waitOn: function () {
		this.subscribe("Customers").wait()
		this.subscribe("Equipments").wait()
		this.subscribe("Models").wait()
		this.subscribe("Makes").wait()
		this.subscribe("Leases").wait()
		this.subscribe("Users").wait()
		this.subscribe("Contacts").wait()
	},
	action: function () {
		if (!Meteor.loggingIn() && !Meteor.user()) {
			this.redirect('/login');
		} else {
				if (this.ready()) {
				Session.set("recordId", this.params.id)
				this.render("nav", {to: "nav"});
				this.render("contacts_form", {to: "modal1"});
				this.render();
			} else {
				this.render("loading")
			};
		}
	}
});

Router.route('customers', {
	template: 'customers_list',
	waitOn: function () {
		if (this.params.query) {
			Session.set("filter", this.params.query.q)
			console.log(Session.get("filter"))
			Session.set("page", this.params.query.page)
		} else {
			Session.set("filter", "a")
			Session.set("page", 1)
		}
		return Meteor.subscribe("Customers");
	},
	data: function() {
		var per_page = 15
		console.log(per_page)
		return Customers.find({customer_name: {$regex: "^"+Session.get("filter")+".*", $options: "i"}}, {sort: {customer_name: 1}, skip: (Session.get("page") - 1) * per_page, limit: per_page})
	},
	action: function () {
		if (!Meteor.loggingIn() && !Meteor.user()) {
			this.redirect('/login');
		} else {
			if (this.ready()) {
				Session.set("recordId", false)
				this.render("nav", {to: "nav"});
				this.render();
			} else {
				this.render("loading")
			}
		}
	}
});
