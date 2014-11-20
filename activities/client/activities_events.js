Template.activities_form.events({
	
	'click button#save_activity' : function(event) {

		var customer_id = $("select#customer_id").val()
		var contact_id = $("select#contact_id").val()
		var activity_type = $("select#activity_type").val()
		var notes = $("textarea#notes").val()
		
		
		if (customer_id != null || contact_id != null) {
			$("form#activity_form")[0].reset()
			$("select#customer_id").val(Session.get("recordId"))
			$('#modal2').modal('hide')
			Activities.insert({customer_id: customer_id, contact_id: contact_id, user_id: Meteor.userId(), activity_type: activity_type, notes: notes, time: new Date()})
		} else {
			Session.set("error", "Select a customer or a contact")
		};
		
	}

})