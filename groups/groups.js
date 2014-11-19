Group = function (doc) {
  _.extend(this, doc);
};

Group.prototype = {
  constructor: Group,
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
	}
});