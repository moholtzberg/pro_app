Router.route('login', {
	layoutTemplate: 'application_layout',
	template: 'login',
	action: function () {
		if (Meteor.user()) {
			Router.go("/");
		} else {
			this.render();
		};
	}
});