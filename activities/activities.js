Activity = function (doc) {
  _.extend(this, doc);
};

Activity.prototype = {
	constructor: Activity,
	
	owner: function() {
		var self = this;
		return Users.findOne({_id: this.user_id})
	}
	
};

Activities = new Meteor.Collection("activities", {
	transform: function (doc) {
		return new Activity(doc);
	}
});

Activities.allow({
	insert: function() {
		return true;
	},
	
	update: function() {
		return true;
	}
});