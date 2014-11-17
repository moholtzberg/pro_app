// Router.route('users/new', {
// 	// layoutTemplate: 'application_layout',
// 	// waitOn: function () {
// 	// 	return Meteor.subscribe("Users")
// 	// },
// 	// data: function() {
// 	// 	return Users.find()
// 	// },
// 	action: function () {
// 		// if (this.ready()) {
// 			$('#modal').modal('show')
// 			Session.set("recordId", false)
// 			this.render("nav", {to: "nav"});
// 			this.render("users_form", {to: "modal"});
// 		// } else {
// 		// 	this.render("loading")
// 		// };
// 	}
// });

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
});