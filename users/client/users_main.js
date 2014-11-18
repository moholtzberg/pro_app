Meteor.subscribe("Users", function(){
	Session.set("usersReady", true)
})