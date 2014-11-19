Template.contacts_form.events({
	
	'click button#save_contact' : function(event) {
		var options = {};
		var first_name = $("input#contact_first_name").val()
		var last_name = $("input#contact_last_name").val()
		var email = $("input#contact_email").val()
		var customer_id = $("select#customer_id").val()
		var group_id = $("select#group_id").val()
		var phone = $("input#contact_phone").val()
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		var it_oustource = $("select#it_outsource").val()
		var it_happy = $("select#it_happy").val()
		var it_use = $("select#it_use").val()
		var it_notes = $("textarea#it_notes").val()
		var it_company = $("#input#it_company").val()
		// if (re.test(email)) {
				$("form#contact_form")[0].reset()
				$('#modal1').modal('hide')
				Contacts.insert({customer_id: customer_id, group_id: group_id, first_name: first_name, last_name: last_name, email: email, phone: phone, active: true})
				Customers.update({_id: customer_id}, {$set: {it: {it_outsource: it_oustource, it_happy: it_happy, it_use: it_use, it_company: it_company, it_notes: it_notes}}})
		// } else {
		// 	Session.set("error", "Email is invalid");
		// };
	}

})