Template.customers_list.events({
	
	'click button.toggle.is_active' : function(event) {
		var customer_id = $("#" + event.currentTarget.id.toString()).attr("id");
		var value = $("#" + event.currentTarget.id.toString() + ".is_active").attr("current_value")
		if (value == undefined || null) {
			value = false
		};
		Customers.update({_id: customer_id}, {$set: {customer_active: !value}})
	}

})

Template.customers_form.events({
	
	'click button#save_contact' : function(event) {
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
			Customers.update({_id: Session.get("recordId")}, {$set: {customer_name: name, customer_address: address, customer_city: city, customer_state: state, customer_zip: zip, customer_phone: phone, customer_fax: fax, customer_user_id: user_id, customer_group_id: group_id, customer_notes: notes }})
			$('#modal3').modal('hide')
		} else {
			Customers.insert({customer_name: name, customer_address: address, customer_city: city, customer_state: state, customer_zip: zip, customer_phone: phone, customer_fax: fax, customer_user_id: user_id, customer_group_id: group_id, customer_notes: notes })
			$('#modal1').modal('hide')
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

extractFromValues = function() {
	var form = {};
	form.customer_name = $("input#customer_name").val();
	form.customer_address = $("input#customer_address").val();
	form.customer_city = $("input#customer_city").val();
	form.customer_state = $("input#customer_state").val();
	form.customer_zip = $("input#customer_zip").val();
	form.customer_phone = $("input#customer_phone").val();
	form.customer_fax = $("input#customer_fax").val();
	form.customer_zip = $("input#customer_zip").val();
	form.customer_user_id = $("input#customer_user_id").val();
	return form;
}

buildDGValues = function(form) {
	var obj = {}
	obj.CustomerName = form.customer_name
	obj.Address = form.customer_address
	obj.City = form.customer_city
	obj.State = form.customer_state
	obj.Zip = form.customer_zip
	obj.Phone1 = form.customer_phone
	obj.Fax = form.customer_fax
	return obj;
}