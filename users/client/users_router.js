Router.route('users', {
	// layoutTemplate: 'application_layout',
	template: 'users_list',
	waitOn: function () {
		return Meteor.subscribe("Users")
	},
	data: function() {
		return Users.find()
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