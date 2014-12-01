Template.tasks_form.helpers({
	customers: function() {
		return Customers.find({customer_active: true}, {sort: {customer_name: 1}});
	}
})

Template.tasks_form.rendered = function() {	
	$(function() {
	    $('select#task_customer_id').selectize()[0].selectize.setValue(Session.get("recordId"))
	});
	$("input#task_due_date").datepicker({autoclose: true, todayHighlight: true})
}

Deps.autorun(function(){
	Meteor.subscribe("Tasks", function(){
		Session.set("tasksReady", true)
	})
})