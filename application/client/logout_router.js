Router.route('logout', {
	path: "/logout",
	action: function () {
		Meteor.logout(function(err){
			if (err) {
				alert(err)
			} else {
				Router.go("/login");
			}
		});
		
	}
});