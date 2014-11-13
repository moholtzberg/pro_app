// Router.route('modules/:id', {
// 	// layoutTemplate: "application_layout",
// 	template: "modules_page",
// 	action: function () {
// 		if (this.ready()) {
// 			Session.set("recordId", this.params.id)
// 			this.render("nav", {to: "nav"});
// 			this.render();
// 		} else {
// 			this.render("loading")
// 		};
// 	}
// });

Router.route('modules', {
	// layoutTemplate: 'application_layout',
	template: 'modules_list',
	waitOn: function () {
		return Meteor.subscribe("Modules")
	},
	data: function() {
		return Modules.find()
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