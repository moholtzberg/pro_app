Template.contacts_form.events({
	
	'click button#save_contact' : function(event) {
		var options = {};
		var first_name = $("input#contact_first_name").val()
		var last_name = $("input#contact_last_name").val()
		var email = $("input#contact_email").val()
		var customer_id = $("select#customer_id").val()
		var phone = $("input#contact_phone").val()
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		if (re.test(email)) {
				$("form#contact_form")[0].reset()
				$('#modal1').modal('hide')
				Contacts.insert({customer_id: customer_id, first_name: first_name, last_name: last_name, email: email, phone: phone, active: true})
		} else {
			Session.set("error", "Email is invalid");
		};
	}

})