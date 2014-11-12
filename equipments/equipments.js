Equipment = function (doc) {
  _.extend(this, doc);
};

Equipment.prototype = {
  constructor: Equipment,
	
  owner: function () {
		user = Meteor.users.findOne({_id: this.user_id});
		// console.log(user);
		if(user) {
			return user.full_name();
		}
  }, 
	
	customer: function () {
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		return Customers.findOne({customer_id: self.customer_id});
	},
		
	lease: function () {
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		return Leases.findOne({dg_lease_id: self.equipment_lease_id});
	},
	
	model: function() {
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		return Models.findOne({dg_model_id: self.equipment_model_id});
	},
	
	active: function() {
		var self = this;
		return !self.dg_info ? self.active : self.dg_info.Active
	},
	
	install_date: function() {
		var self = this;
		return !self.dg_info ? self.install_date : self.dg_info.InstallDate
		// return moment().format(install_date)
	}

};

Equipments = new Meteor.Collection("equipments", {
	transform: function (doc) {
		return new Equipment(doc);
	}
});

Equipments.allow({
	insert: function() {
		return true;
	},
	
	update: function() {
		return true;
	}
});