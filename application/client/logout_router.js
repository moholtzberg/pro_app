Router.route('logout', {
	action: function () {
		Meteor.logout();
		Router.go("/login");
	}
});