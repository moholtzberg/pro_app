Contact = function (doc) {
  _.extend(this, doc);
};

Contact.prototype = {
  constructor: Contact,
	
	customer: function () {
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		return Customers.findOne({customer_id: self.customer_id});
	}

};

Contacts = new Meteor.Collection("contacts", {
	transform: function (doc) {
		return new Contact(doc);
	}
});

Contacts.allow({
	insert: function() {
		return true;
	},
	
	update: function() {
		return true;
	}
});