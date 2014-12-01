Router.route('logout', {
	path: "/logout",
	action: function () {
		Meteor.logout(function(err){
			if (err) {
				alert(err)
			} else {
				Session.set("loggedIn", false)
				Router.go("/login");
			}
		});
		
	}
});