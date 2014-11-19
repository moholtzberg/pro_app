Router.route('modules', {
	// layoutTemplate: 'application_layout',
	template: 'modules_list',
	data: function() {
		return Modules.find()
	},
	action: function () {
		if (!Meteor.loggingIn() && !Meteor.user()) {
			this.redirect('/login');
		} else {
			if (this.ready()) {
				Session.set("recordId", false)
				this.render("nav", {to: "nav"});
				this.render();
			} else {
				this.render("loading")
			};
		}
	}
});