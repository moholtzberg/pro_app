Template.users_list.events({
	
	'click button.toggle.is_admin' : function(event) {
		var user_id = $("#" + event.currentTarget.id.toString()).attr("id");
		var value = $("#" + event.currentTarget.id.toString() + ".is_admin").attr("current_value")
		if (value == undefined || null) {
			value = false
		};
		Users.update({_id: user_id}, {$set: {"profile.is_admin": !value}})
	},
	
	'click button.toggle.is_active' : function(event) {
		var user_id = $("#" + event.currentTarget.id.toString()).attr("id");
		var value = $("#" + event.currentTarget.id.toString() + ".is_active").attr("current_value")
		if (value == undefined || null) {
			value = false
		};
		Users.update({_id: user_id}, {$set: {active: !value}})
	}

})

Template.users_form.events({
	
	'click button#save_user' : function(event) {
		var options = {};
		options.profile = {};
		options.profile.first_name = $("#user_first_name").val()
		options.profile["last_name"] = $("#user_last_name").val()
		options.profile["is_admin"] = false
		options.active = true
		options.email = $("#user_email").val()
		options.password = $("#user_password").val()
		var confirm_password = $("#user_confirm_password").val()
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		if ((options.password.length >= 6) && (options.password === confirm_password) && (re.test(options.email))) {
			Meteor.call("createNewUser", options, function(e){
				if (!e) {
					$("form#user_form")[0].reset()
					$('#modal1').modal('hide')
				};
			})
		} else {
			console.log("We are here")
			switch (true) {
				case (options.password != confirm_password):
					console.log("and here")
					Session.set("error", "Passwords do not match");
					break;
				case (options.password.length <= 6):
					console.log("and here 1")
					Session.set("error", "Password must be 6 charachters or longer");
					break;
				case (!re.test(options.email)):
					console.log("and here 2")
					Session.set("error", "Email is invalid");
					break;
			}
			
		};
	}

})

// Deps.autorun(function(){
// 	alert(Session.get("error"))
// })