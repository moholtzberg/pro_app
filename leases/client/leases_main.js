Meteor.subscribe("Leases", function(){
	Session.set("leasesReady", true)
})