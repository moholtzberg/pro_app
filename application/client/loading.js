Template.loading.helpers({
	
	contacts_loaded: function(){
		return Session.get("contactsReady")
	},
	
	customers_loaded: function(){
		return Session.get("customersReady")
	},
	
	equipments_loaded: function(){
		return Session.get("equipmentsReady")
	},
	
	leases_loaded: function(){
		return Session.get("leasesReady")
	},
	
	makes_loaded: function(){
		return Session.get("makesReady")
	},
	
	models_loaded: function(){
		return Session.get("modelsReady")
	},
	
	modules_loaded: function(){
		return Session.get("modulesReady")
	},
	
	users_loaded: function(){
		return Session.get("usersReady")
	}
	
})