Template.leases_list.events({
	
	'click button.group_filter#go' : function(event) {
		console.log("we presesed go")
		Session.set("rangeStart", $("#range_start").val())
		Session.set("rangeEnd", $("#range_end").val())
		// console.log(Session.get("rangeStart"))
		// console.log(Session.get("rangeEnd"))
		Router.go("/leases?min="+Session.get("rangeStart")+"&max="+Session.get("rangeEnd"))
	}

})