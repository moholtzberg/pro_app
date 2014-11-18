Meteor.subscribe("Models", function(){
	Session.set("modelsReady", true)
})