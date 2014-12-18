Router.route('customers/new', {
	template: "customers_form",
	action: function () {
		this.render();
	}
});

Router.route('customers/maps', {
	template: "customers_map",
	waitOn: function(){
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
		if (MapBounds.find().count() < 1) {
			MapBounds.insert(bounds);
		} else {
			MapBounds.update({}, bounds);
		}
		this.subscribe("CustomersByGeolocation",  MapBounds.findOne(), "blank")
		this.next()
	},
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
		this.subscribe("CustomerById",  Session.get("recordId"))
		this.next()
	},
	// onBeforeAction: function() {
	// 	if (this.params) {
	// 		Session.set("recordId", this.params.id)
	// 	};
	// 	this.next()
	// },
	data: function() {
		return Customers.findOne({_id: Session.get("recordId")});
	},
	action: function() {
		this.render("contacts_form", {to: "modal1"});
		this.render("activities_form", {to: "modal2"})
		this.render("customers_form", {to: "modal3"})
		this.render("tasks_form", {to: "modal4"})
		this.render();
	}
});

Router.route('customers', {
	template: 'customers_list',
	waitOn: function(){
		console.log(this.params.query)
		// Session.set("filter", this.params.query.q)
		// Session.set("page", this.params.query.page)
		// alert(Session.get("filter"))
		this.subscribe("Customers", Session.get("filter"), Session.get("group_filter"), Session.get("page"), 15).wait()
		// this.next()
	},
	data: function(){
		return Customers.find()
			// return Customers.find({$and: [{customer_group_id: {$in: [Session.get("group_filter")]}}, {customer_name: {$regex: "^"+Session.get("filter")+".*", $options: "i"}}]})
		},
	action: function() {
		Session.set("filter", this.params.query.q)
		Session.set("recordId", false)
		this.render("customers_form", {to: "modal1"})
		this.render();
		// this.next()
	}
});
