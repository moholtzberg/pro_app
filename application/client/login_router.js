Router.route('login', {
	action: function () {
		if (Meteor.user()) {
			Session.set("loggedIn", true)
			this.redirect("/");
		} else {
			this.render("login")
		}
	}
});