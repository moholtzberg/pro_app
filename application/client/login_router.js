Router.route('login', {
	action: function () {
		if (Meteor.user()) {
			this.redirect("/");
		} else {
			this.render("login")
		}
	}
});