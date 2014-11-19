Meteor.subscribe("Leases", function(){
	Session.set("groupsReady", true)
})