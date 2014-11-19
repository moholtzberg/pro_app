Router.route('groups', {
	template: 'groups_list',
	data: function() {
		return Groups.find()
	},
	action: function () {
		$('#modal1').modal('hide')
		Session.set("recordId", false)
		this.render("groups_form", {to: "modal1"});
		this.render();
	}
});