Template.contacts_form.helpers({
	customers: function() {
		return Customers.find({customer_active: true}, {sort: {customer_name: 1}});
	},
	
	groups: function() {
		return Groups.find({$and: [{active: true}, {group_type: "contacts"}]}, {sort: {name: 1}});
	}
	
})

Template.contacts_form.rendered = function() {	
	$(function() {
	    $('select#contact_customer_id').selectize()[0].selectize.setValue(Session.get("recordId"))
	});
	$(function() {
	    $('select#contact_group_id').selectize()
	});
}

Tracker.autorun(function(){
	Meteor.subscribe("Contacts", function(){
		Session.set("contactsReady", true)
		if (DDP._allSubscriptionsReady()) {
			Session.set("subsReady", true)
		};
	})
})