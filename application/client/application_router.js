Router.route('/', {
	
	template: 'home',

	action: function () {
		if (this.ready()) {
			this.render("nav", {to: "nav"});
			this.render();
		} else {
			this.render("loading")
		};
	}
});

Router.configure({
	layoutTemplate: 'application_layout',
	loadingTemplate: 'loading',
	waitOn: function () { 
		return Meteor.subscribe('Modules'); 
	},

	onBeforeAction: function() {
		if (!Meteor.loggingIn() && !Meteor.user()) {
			Router.go('/login');
		}
	}
});