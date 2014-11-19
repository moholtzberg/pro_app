Router.route('users', {
	// layoutTemplate: 'application_layout',
	template: 'users_list',
	data: function() {
		return Users.find()
	},
	action: function () {
		if (!Meteor.loggingIn() && !Meteor.user()) {
			this.redirect('/login');
		} else {
			$('#modal1').modal('hide')
			if (this.ready()) {
				Session.set("recordId", false)
				this.render("nav", {to: "nav"});
				this.render("users_form", {to: "modal1"});
				this.render();
			} else {
				this.render("loading")
			};
		}
	}
});