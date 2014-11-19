Template.groups_form.events({
	
	'click button#save_group' : function(event) {
		console.log("click save groip")
		var name = $("input#name").val()
		var group_type = $("input#group_type").val()
		
				$("form#group_form")[0].reset()
				$('#modal1').modal('hide')
				Groups.insert({name: name, group_type: group_type, active: true})
	}

})