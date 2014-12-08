Deps.autorun(function(){
	Meteor.subscribe("Modules", function(){
		Session.set("modulesReady", true)
	})
})