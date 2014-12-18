Template.login.events({
	
	'click input#login, submit #login-form' : function(event) {
		event.preventDefault();
		var un = $("#email").val().toLowerCase();
		var pw = $("#password").val();
		console.log(un + "  " + pw)
		if(!Meteor.loginWithPassword(un, pw, function(err){
			if (err) {
				console.log(err)
			} else {
				Router.go("/")
			};
		})) {
			console.log("Failed")
		}
	}
	
})