Template.users_list.events({
	
	'click button.toggle.is_admin' : function(event) {
		var user_id = $("#" + event.currentTarget.id.toString()).attr("id");
		var value = $("#" + event.currentTarget.id.toString()).attr("current_value")
		if (value == undefined || null) {
			value = false
		};
		console.log(value)
		console.log(!value)
		Users.update({_id: user_id}, {$set: {"profile.is_admin": !value}})
	},
	
	'click button.toggle.is_active' : function(event) {
		var user_id = $("#" + event.currentTarget.id.toString()).attr("id");
		var value = $("#" + event.currentTarget.id.toString()).attr("current_value")
		if (value == undefined || null) {
			value = false
		};
		console.log(value)
		console.log(!value)
		Users.update({_id: user_id}, {$set: {active: !value}})
	}

})