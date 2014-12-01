Meteor.methods({
	//todo create remote toget contacts from remote server
});

Meteor.publish("Tasks", function () {
	user = Meteor.users.findOne({_id: this.userId});
	console.log("Tasks --> " + Tasks.find({}).count())
	if (user) {
		if (user.is_admin || user.profile.is_admin) {
			
			return Tasks.find({}, {sort: {due_date: 1}});
		} else {
			// var customerIds = Customers.find({user_id : this.userId}).map(function(customer) {
			// 				return customer._id;
			// 			});
			// 			console.log("Tasks --> " + Tasks.find({}).count())
			return Tasks.find({user_id: user._id});
		};
	};
});

Meteor.startup( function(){
	
	// Tasks._ensureIndex( {dg_equipment_id: 1})
	// Tasks.drop()
	if (!Modules.findOne({slug: "tasks"})) {
		Modules.insert({name: "Tasks", slug: "tasks", icon: "fa-check-square-o", active: false, admin_only: true, last_update: new Date("01/01/2004")})
	}
	
});