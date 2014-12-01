Deps.autorun(function(){
	Meteor.subscribe("Equipments", function(){
		Session.set("equipmentsReady", true)
	})
})