User = function (doc) {
  _.extend(this, doc);
};

User.prototype = {
  constructor: User
};

Meteor.users._transform = function(doc) {
	return new User(doc)
}

Users = Meteor.users