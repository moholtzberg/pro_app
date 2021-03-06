Lease = function (doc) {
  _.extend(this, doc);
};

Lease.prototype = {
  constructor: Lease,
		
	equipments: function () {
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		return Equipments.find({dg_lease_id: self.dg_lease_id}).fetch();
	},
	
	active: function() {
		var self = this;
		return !self.dg_info ? self.active : self.dg_info.Active
	},
	
	end_date: function() {
		var self = this;
		return !self.lease_start_date ? false : moment(self.lease_start_date).add(self.lease_term, "months").toISOString();
	},
	
	leasing_company: function() {
		var self = this;
		return Customers.findOne({dg_customer_id: self.dg_leasing_company_id})
	},
	
	customer: function() {
		var self = this;
		return Customers.findOne(({dg_customer_id: self.lease_customer_id}))
	}

};

Leases = new Meteor.Collection("leases", {
	transform: function (doc) {
		return new Lease(doc);
	}
});

Leases.allow({
	insert: function() {
		return true;
	},
	
	update: function() {
		return true;
	}
});