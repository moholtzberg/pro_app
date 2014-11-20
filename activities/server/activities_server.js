Meteor.methods({
	//todo create remote toget contacts from remote server
});

Meteor.publish("Activities", function () {
	user = Meteor.users.findOne({_id: this.userId});
	if (user) {
		if (user.is_admin || user.profile.is_admin) {
			return Activities.find({});
		} else {
			return Activities.find({user_id: this.userId});
		};
	};
});

Meteor.startup( function(){
	
	// Activites._ensureIndex( {dg_equipment_id: 1})
	
	if (!Modules.findOne({slug: "activities"})) {
		Modules.insert({name: "Activities", slug: "activities", icon: "fa-paperclip", active: false, admin_only: true, last_update: new Date("01/01/2004")})
	}
	
});