Router.route('tasks/new', {
	template: "tasks_form",
	action: function () {
		this.render();
	}
});

Router.route('tasks/:id', {
	template: "tasks_page",
	waitOn: function() {
		if (this.params) {
			Session.set("recordId", this.params.id)
		};
	},
	data: function() {
		return Customers.findOne({_id: Session.get("recordId")});
	},
	action: function() {
		this.render("contacts_form", {to: "modal1"});
		this.render("activities_form", {to: "modal2"})
		this.render("customers_form", {to: "modal3"})
		this.render();
	}
});

Router.route('tasks', {
	template: 'tasks_list',
	data: function(){
		var per_page = 15
		return Tasks.find({user_id: Meteor.userId()}, {sort: {due_date: 1}})
		// return Tasks.find({})
	},
	action: function() {
		Session.set("recordId", false)
		this.render();
	}
});
