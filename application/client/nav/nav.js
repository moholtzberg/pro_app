Template.nav.helpers({
	modules: function () {
		return Modules.find({active: true});
	}
});