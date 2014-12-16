Router.route('leases', {
	template: 'leases_list',
	waitOn: function(){
		if (this.params.query) {
			Session.set("rangeStart", this.params.query.min)
			Session.set("rangeEnd", this.params.query.max)
			Session.set("page", this.params.query.page)
			// console.log(Session.get("rangeStart"))
			// console.log(Session.get("rangeEnd"))
		} else {
			// Session.set("leaseFilterMin", 0)
			// Session.set("leaseFilterMax", 15)
			Session.set("page", 1)
		}
	},
	data: function() {
		var per_page = 15
		console.log(Session.get("rangeStart"))
		console.log(new Date(Session.get("rangeEnd")))
		var leases =  Leases.find({lease_end_date: {$gte: new Date(Session.get("rangeStart")).toISOString(), $lt: new Date(Session.get("rangeEnd")).toISOString()} }, {sort: {lease_end_date: 1}, skip: (Session.get("page") - 1) * per_page, limit: per_page})
		console.log(leases.count())
		return leases;
		// return Leases.find({$and: [{customer_group_id: {$in: [Session.get("group_filter")]}}, {customer_name: {$regex: "^"+Session.get("filter")+".*", $options: "i"}}]}, {sort: {customer_name: 1}, skip: (Session.get("page") - 1) * per_page, limit: per_page})
	},
	action: function () {
		console.log("leases_list")
		$('#modal1').modal('hide')
		Session.set("recordId", false)
		Session.set("groupType", false)
		this.render("leases_form", {to: "modal1"});
		this.render();
	}
});