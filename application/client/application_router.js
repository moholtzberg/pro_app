Router.route('/', {
	// layoutTemplate: "application_layout",
	template: 'home',
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
			this.subscribe("Modules").wait()
		}
	}
});
