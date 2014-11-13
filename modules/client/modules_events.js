Template.modules_list.events({
	
	'click button.toggle.admin_only' : function(event) {
		var module_id = $("#" + event.currentTarget.id.toString()).attr("id");
		var value = $("#" + event.currentTarget.id.toString()).attr("current_value")
		if (value == undefined || null) {
			value = false
		};
		console.log(value)
		console.log(!value)
		Modules.update({_id: module_id}, {$set: {admin_only: !value}})
	},
	
	'click button.toggle.is_active' : function(event) {
		var module_id = $("#" + event.currentTarget.id.toString()).attr("id");
		var value = $("#" + event.currentTarget.id.toString()).attr("current_value")
		if (value == undefined || null) {
			value = false
		};
		console.log(value)
		console.log(!value)
		Modules.update({_id: module_id}, {$set: {active: !value}})
	}

})