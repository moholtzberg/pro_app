Router.route('/', {
	// layoutTemplate: "application_layout",
	template: 'home',
	// waitOn: function(){
	// 	if (Meteor.user()) {
	// 		this.subscribe("Customers").wait()
	// 		this.subscribe("Equipments").wait()
	// 		this.subscribe("Models").wait()
	// 		this.subscribe("Makes").wait()
	// 		this.subscribe("Leases").wait()
	// 		this.subscribe("Users").wait()
	// 		this.subscribe("Contacts").wait()
	// 	}
	// },
	action: function() {
		if (this.ready()) {
			this.render("nav", {to: "nav"});
			this.render();
		} else {
			this.render("loading")
		};
	}
});

Router.configure({
	layoutTemplate: "application_layout",
	loadingTemplate: "loading",
	waitOn: function(){
		if (Meteor.user()) {
			this.subscribe("Customers").wait()
			this.subscribe("Equipments").wait()
			this.subscribe("Models").wait()
			this.subscribe("Makes").wait()
			this.subscribe("Leases").wait()
			this.subscribe("Users").wait()
			this.subscribe("Contacts").wait()
		}
	}
	// onRun: function() {
	// 	if (!Meteor.loggingIn() && !Meteor.user()) {
	// 		this.redirect('/login');
	// 	} else {
	// 		this.render()
	// 		this.next
	// 	}
	// }
});
