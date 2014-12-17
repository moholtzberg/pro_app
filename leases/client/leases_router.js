Router.route('leases', {
	template: 'leases_list',
	waitOn: function(){
		if (this.params.query){
			if (this.params.query.min && this.params.query.max) {
				Session.set("rangeStart", new Date(this.params.query.min).toISOString())
				Session.set("rangeEnd", new Date(this.params.query.max).toISOString())
			}
			Session.set("page", this.params.query.page)
		} else {
			Session.set("rangeStart", moment(new Date()).toISOString())
			Session.set("rangeEnd", moment(new Date()).add(30, "days").toISOString())
			Session.set("page", 1)
		}
	},
	data: function() {
		var per_page = 15
		console.log(Session.get("rangeStart"))
		console.log(Session.get("rangeEnd"))
		var leases =  Leases.find({lease_end_date: {$gte: Session.get("rangeStart"), $lt: Session.get("rangeEnd")} }, {sort: {lease_end_date: 1}, skip: (Session.get("page") - 1) * per_page, limit: per_page})
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