Template.groups_form.events({
	
	'change select#group_type' :function(event) {
		Session.set("groupType", $("select#group_type").val())
	},
	
	'click button#save_group' : function(event) {
		var name = $("input#name").val()
		var group_type = $("select#group_type").val()
		var field_name = $("select#field_name").val()
		var field_filter = $("select#field_filter").val()
		var field_value = $("input#field_value").val()
		$("form#group_form")[0].reset()
		$('#modal1').modal('hide')
		var a = Groups.insert({name: name, group_type: group_type, active: true, filter: {field_name: field_name, field_filter: field_filter, field_value: field_value}})
		var qry = "{\"" + field_name + "\":\"" + field_value + "\"}"
		console.log(JSON.parse(qry))
		Customers.find(JSON.parse(qry)).map(function(customer){
			// console.log(customer.customer_name)
			// if (customer.customer_group_id) {
			// 	// console.log(customer.customer_group_id)
			// 	// var groups = customer.customer_group_id.push(a._id)
			// 	// console.log(groups)
			// 	// var groups = [a._id]
			// } else {
			// 	console.log("no group")
			// 	var groups = [a._id]
			// 	console.log(groups)
			// }
			// console.log(a)
			Customers.update({_id: customer._id}, {$push: {customer_group_id: {$each: [a]}}})
			
		})
		$("form#group_form")[0].reset()
		Session.set("groupType", null)
	}
})

Template.groups_list.events({
	'click button.toggle.is_active' : function(event) {
		var customer_id = $("#" + event.currentTarget.id.toString()).attr("id");
		var value = $("#" + event.currentTarget.id.toString() + ".is_active").attr("current_value")
		if (value == undefined || null) {
			value = false
		};
		Groups.update({_id: customer_id}, {$set: {active: !value}})
	},
	
	'click button.delete' : function(event) {
		var customer_id = $("#" + event.currentTarget.id.toString()).attr("id");
		if (Groups.findOne({_id: customer_id}).record_count() == 0) {
			Groups.remove({_id: customer_id})
		} else {
			Session.set("error", "Cannot delete group with associated records!")
			$('#errorModal').modal('show')
		};
		
	}
})