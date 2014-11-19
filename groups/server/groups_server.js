Meteor.publish("Groups", function() {
	return Groups.find();
});

Meteor.startup( function(){
	
	// Groups._ensureIndex( {dg_lease_id: 1})
	
	if (!Modules.findOne({slug: "groups"})) {
		Modules.insert({name: "Groups", slug: "groups", icon: "fa-group", active: false, admin_only: true, last_update: new Date("01/01/2004")})
	}
	
});