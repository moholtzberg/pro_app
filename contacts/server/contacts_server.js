Meteor.methods({
	//todo create remote toget contacts from remote server
});

Meteor.publish("Contacts", function () {
	user = Meteor.users.findOne({_id: this.userId});
	if (user) {
		if (user.is_admin || user.profile.is_admin) {
			return Contacts.find({}, {sort: {last_name: 1}});
		} else {
			var customerIds = Customers.find({user_id : this.userId}).map(function(customer) {
				return customer._id;
			});
			return Contacts.find({customer_id: {$in: customerIds}});
		};
	};
});

Meteor.startup( function(){
	
	Contacts._ensureIndex( {dg_equipment_id: 1})
	
	if (!Modules.findOne({slug: "contacts"})) {
		Modules.insert({name: "Contacts", slug: "contacts", icon: "fa-user", active: false, admin_only: true, last_update: new Date("01/01/2004")})
	}
	
});