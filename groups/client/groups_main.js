Deps.autorun(function(){
	Meteor.subscribe("Groups", function(){
		Session.set("groupsReady", true)
	})
})

Template.groups_form.helpers({
	customer_keys: function() {
		if (Session.get("groupType")) {
			return Modules.findOne({slug: Session.get("groupType")}).fields
		}
	},
	
	customer_values: function() {
		var field_values;
		switch(Session.get("groupType")) {
			case "customers": 
				field_values =  Customers.find().map(function(record) { return record.customer_name } )
				break
			case "contacts":
				field_values =  Contacts.find().map(function(record) { return eval(record.Session.get("groupField")) } )
				break;
		};
		
		return field_values
	}
})