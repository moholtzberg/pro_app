Router.route('modules', {
	template: 'modules_list',
	data: function() {
		return Modules.find()
	},
	action: function () {
		Session.set("recordId", false)
		this.render();
	}
});