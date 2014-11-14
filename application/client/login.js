Template.login.events({
	
	'click a#login, submit #login-form' : function(event) {
		// event.preventDefault();
		var un = $("#username").val();
		var pw = $("#password").val();
		console.log(un + "  " + pw)
		if(!Meteor.loginWithPassword(un, pw, function(err){
			if (err) {
				console.log(err)
			} else {
				console.log(this)
				Router.go("/")
			};
		})) {
			console.log("Failed")
		}
	}
	
})