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
		return Equipments.find({$or: [{lease_id: self._id}, {"dg_info.LeaseID": self.dg_info.LeaseID}]}).fetch();
	},
	
	active: function() {
		var self = this;
		return !self.dg_info ? self.active : self.dg_info.Active
	},
	
	start_date: function() {
		var self = this;
		return !self.dg_info ? self.start_date : self.dg_info.StartDate
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