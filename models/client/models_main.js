Deps.autorun(function(){
	Meteor.subscribe("Models", function(){
		Session.set("modelsReady", true)
	})
})