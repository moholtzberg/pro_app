User = function (doc) {
  _.extend(this, doc);
};

User.prototype = {
	constructor: User,
	
	full_name: function() {
		var self = this;
		return self.profile.first_name + " " + self.profile.last_name
	}
};

Meteor.users._transform = function(doc) {
	return new User(doc)
}

Users = Meteor.users