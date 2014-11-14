Router.route('logout', {
	action: function () {
		Meteor.logout(function(err){
			if (!err) {
				Router.go("/login");
			};
		});
		
	}
});