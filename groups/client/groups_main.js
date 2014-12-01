Deps.autorun(function(){
	Meteor.subscribe("Groups", function(){
		Session.set("groupsReady", true)
	})
})