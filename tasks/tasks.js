Task = function (doc) {
  _.extend(this, doc);
};

Task.prototype = {
  constructor: Task,
	
	customer: function () {
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		return Customers.findOne({customer_id: self.customer_id});
	},
	
	related_to: function() {
		var ret;
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		switch(self.related_module){
			case "customers":
				ret = Customers.findOne({_id: self.related_id}).name()
				break
			case "contacts":
				ret = Contacts.findOne({_id: self.related_id}).full_name()
				break
		}
		return ret;
	},
	
	past_due: function() {
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		var now = new Date()
		var due = new Date(self.due_date)
		console.log(new Date(self.due_date) < now)
		return (due < now) && (!self.completed)
	},
	
	assigned_to: function() {
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		return Users.findOne(self.user_id)
	}

};

Tasks = new Meteor.Collection("tasks", {
	transform: function (doc) {
		return new Task(doc);
	}
});

Tasks.allow({
	insert: function() {
		return true;
	},
	
	update: function() {
		return true;
	}
});