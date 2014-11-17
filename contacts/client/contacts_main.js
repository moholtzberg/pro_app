Template.contacts_form.helpers({
	customers: function() {
		return Customers.find({customer_active: true}, {sort: {customer_name: 1}});
	}
})

Template.contacts_form.rendered = function() {
	if (Session.get("recordId") != (null || undefined)) {
		$("select#customer_id").val(Session.get("recordId"))
	};
}