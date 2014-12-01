Deps.autorun(function(){
	Meteor.subscribe("Users", function(){
		Session.set("usersReady", true)
	})
})