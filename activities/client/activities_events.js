Template.activities_form.events({
	
	'click button#save_activity' : function(event) {

		var customer_id = $("select#customer_id").val()
		var contact_id = $("select#contact_id").val()
		var activity_type = $("select#activity_type").val()
		var notes = $("textarea#notes").val()
		
		$("form#contact_form")[0].reset()
		$('#modal2').modal('hide')
		Activities.insert({customer_id: customer_id, contact_id: contact_id, user_id: Meteor.userId(), activity_type: activity_type, notes: notes, time: new Date()})
	}

})