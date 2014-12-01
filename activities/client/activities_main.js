Template.activities_form.helpers({
	
	customers: function() {
		return Customers.find({customer_active: true}, {sort: {customer_name: 1}});
	},
	
	contacts: function() {
		return Contacts.find({$and: [{active: true}, {customer_id: Session.get("recordId")}]}, {sort: {name: 1}});
	}
	
})

Template.activities_form.rendered = function() {
	if (Session.get("recordId") != (null || undefined)) {
		$("select#customer_id").val(Session.get("recordId"))
	};
}

Deps.autorun(function(){
	Meteor.subscribe("Activities", function(){
		Session.set("activitiesReady", true)
	})
})