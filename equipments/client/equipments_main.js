Meteor.subscribe("Equipments", function(){
	Session.set("equipmentsReady", true)
})