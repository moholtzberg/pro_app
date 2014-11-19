Template.nav.helpers({
	modules: function () {
		return Modules.find({active: true});
	}
});

Template.nav.events({
	"click a.record": function() {
		$(".navmenu").offcanvas("hide")
	}
})