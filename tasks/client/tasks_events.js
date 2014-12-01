Template.tasks_list.events({
	
	'click button.toggle.is_complete' : function(event) {
		var task_id = $("#" + event.currentTarget.id.toString()).attr("id");
		var value = $("#" + event.currentTarget.id.toString() + ".is_complete").attr("current_value")
		if (value == undefined || null) {
			value = false
		};
		Tasks.update({_id: task_id}, {$set: {completed: !value}})
	}

})

Template.tasks_form.events({
	
	'click button#save_task' : function(event) {
		var description = $("input#task_description").val()
		var customer_id = $("select#task_customer_id").val()
		var due_date = $("input#task_due_date").val()
		var notes = $("textarea#task_notes").val()
		
		$("form#save_task")[0].reset()
		$('#modal4').modal('hide')
		Tasks.insert({
			description: description, 
			related_module: "customers",
			related_id: customer_id,
			customer_id: customer_id, 
			due_date: due_date, 
			notes: notes, 
			completed: false, 
			user_id: Meteor.userId()
		})
		Activities.insert({customer_id: customer_id, user_id: Meteor.userId(), activity_type: "Created Task", notes: notes, time: new Date()})
	}
})