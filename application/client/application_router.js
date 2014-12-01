Router.route('/', {
	template: "home",
	data: function() {
		return "From the home route \"/\""
	},
	action: function() {
		this.render();
	}
});

Router.configure({
	layoutTemplate: "application_layout",
	loadingTemplate: "loading",
	onBeforeAction: function(){
		if (!Meteor.user() && !Meteor.loggingIn()) {
			this.redirect('/login');
			this.next()
		} else {
			this.render("nav", {to: "nav"})
			this.next()
		}
	},
	waitOn: function(){
		if (Meteor.user()) {
			this.subscribe("Modules").wait()
			this.subscribe("Customers").wait()
			this.subscribe("Contacts").wait()
			this.subscribe("Users").wait()
			this.subscribe("Models").wait()
			this.subscribe("Leases").wait()
			this.subscribe("Groups").wait()
			this.subscribe("Equipments").wait()
			this.subscribe("Tasks").wait()
			this.subscribe("Activities").wait()
		};
	}

});
