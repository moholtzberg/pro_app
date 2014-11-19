Router.route('users', {
	template: 'users_list',
	data: function() {
		return Users.find()
	},
	action: function () {
		$('#modal1').modal('hide')
		Session.set("recordId", false)
		this.render("users_form", {to: "modal1"});
		this.render();
	}
});