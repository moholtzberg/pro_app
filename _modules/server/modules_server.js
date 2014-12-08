Meteor.startup(function(){
	if (!Modules.findOne({slug: "modules"})) {
		console.log("No Module found");
		Modules.insert({name: "Modules", slug: "modules", icon: "fa-cog", admin_only: true, active: true});
	};
});

Meteor.publish("Modules", function () {
	if (Meteor.users.findOne(this.userId) && Meteor.users.findOne(this.userId).profile && Meteor.users.findOne(this.userId).profile.is_admin) {
		return Modules.find();
	} else {
		return Modules.find({admin_only: false, active: true})
	};
});