Template.customers_list.events({
	
	'click button.toggle.is_active' : function(event) {
		var customer_id = $("#" + event.currentTarget.id.toString()).attr("id");
		var value = $("#" + event.currentTarget.id.toString() + ".is_active").attr("current_value")
		if (value == undefined || null) {
			value = false
		};
		Customers.update({_id: customer_id}, {$set: {customer_active: !value}})
	},
	
	'click button.group_filter' : function(event) {
		if (event.currentTarget.id != "all") {
			Session.set("group_filter", event.currentTarget.id)
		} else {
			Session.set("group_filter", null)
		};
		
	}

})

Template.customers_form.events({
	
	'click button#save_customer' : function(event) {
		var name = $("input#customer_name").val()
		var address = $("input#customer_address").val()
		var city = $("input#customer_city").val()
		var state = $("input#customer_state").val()
		var zip = $("input#customer_zip").val()
		var phone = $("input#customer_phone").val()
		var fax = $("input#customer_fax").val()
		var user_id = $("#customer_user_id").val()
		var group_id = $("#customer_group_id").val()
		var notes = $("#customer_notes").val()
		
		if (Session.get("recordId")) {
			Customers.update({_id: Session.get("recordId")}, {$set: {customer_name: name, customer_address: address, customer_city: city, customer_state: state, customer_zip: zip, customer_phone: phone, customer_fax: fax, customer_user_id: user_id, customer_group_id: group_id, customer_notes: notes, last_update: new Date() }})
			$('#modal3').modal('hide')
			Customers.findOne({_id: Session.get("recordId")}).UpdateGeoLocation()
		} else {
			Customers.insert({customer_name: name, customer_address: address, customer_city: city, customer_state: state, customer_zip: zip, customer_phone: phone, customer_fax: fax, customer_user_id: user_id, customer_group_id: group_id, customer_notes: notes })
			$('#modal1').modal('hide')
			$("form#save_customer")[0].reset()
		};
		
	}
	
})

Template.customers_map.events({
	
	'click button.group_filter' : function(event) {
		if (event.currentTarget.id != "all") {
			Session.set("group_filter", event.currentTarget.id)
		} else {
			Session.set("group_filter", null)
		};
		
	}
	
})

Template.customers.events({
	
	'click button#toggleView' : function(event) {
		console.log("Clicked Toggle");
		event.preventDefault();
		if (Session.get("mapView") !== true) {
			Session.set("mapView", true);
		} else {
			Session.set("mapView", false);
		};
	}
	
});