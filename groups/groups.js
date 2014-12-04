Group = function (doc) {
  _.extend(this, doc);
};

Group.prototype = {
	constructor: Group,
	
	record_count: function() {
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		switch (self.group_type) {
			case "customers":
				console.log("in customers")
				return Customers.find({customer_group_id:{$in: [self._id]}}).count()
				break
			case "contacts":
				console.log("in contacts")
				return Customers.find({group_id:{$in: [self._id]}}).count()
				break
		}
	}
};

Groups = new Meteor.Collection("groups", {
	transform: function (doc) {
		return new Group(doc);
	}
});

Groups.allow({
	insert: function() {
		return true;
	},
	update: function() {
		return true;
	},
	remove: function() {
		return true;
	}
});