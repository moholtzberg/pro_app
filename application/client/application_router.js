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
			this.render()
		}
	},
	waitOn: function(){
		this.subscribe("Modules").wait()
		this.subscribe("Customers").wait()
	}

});
