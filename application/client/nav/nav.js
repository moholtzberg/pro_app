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

Template.nav.rendered = function() {
	$(".navmenu-fixed-left").offcanvas({
     placement: "left",
     autohide: true,
     recalc: true,
     toggle: false
 });
}