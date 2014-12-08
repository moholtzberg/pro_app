Router.route('leases', {
	template: 'leases_list',
	waitOn: function(){
		if (this.params.query) {
			Session.set("leaseFilterMin", this.params.query.min)
			Session.set("leaseFilterMax", this.params.query.max)
			Session.set("page", this.params.query.page)
		} else {
			Session.set("leaseFilterMin", 0)
			Session.set("leaseFilterMax", 15)
			Session.set("page", 1)
		}
	},
	data: function() {
		var per_page = 15
		return Leases.find({lease_end_date: {$gte: moment(new Date()).add(Session.get("leaseFilterMin"), "days").toISOString(), $lt: moment(new Date()).add(Session.get("leaseFilterMax"), "days").toISOString()} }, {sort: {lease_end_date: 1}, skip: (Session.get("page") - 1) * per_page, limit: per_page})
		// return Leases.find({$and: [{customer_group_id: {$in: [Session.get("group_filter")]}}, {customer_name: {$regex: "^"+Session.get("filter")+".*", $options: "i"}}]}, {sort: {customer_name: 1}, skip: (Session.get("page") - 1) * per_page, limit: per_page})
	},
	action: function () {
		$('#modal1').modal('hide')
		Session.set("recordId", false)
		Session.set("groupType", false)
		this.render("leases_form", {to: "modal1"});
		this.render();
	}
});