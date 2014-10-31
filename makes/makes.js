Make = function (doc) {
  _.extend(this, doc);
};

Make.prototype = {
  constructor: Make,
	
	make_name: function () {
		var self = this;
		return !self.dg_info ? self.make_name: self.dg_info.Make
	},
	
	models: function () {
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		return Models.find({"dg_info.MakeID": self.dg_info.MakeID});
	}

};

Makes = new Meteor.Collection("makes", {
	transform: function (doc) {
		return new Make(doc);
	}
});

Makes.allow({
	insert: function() {
		return true;
	},
	
	update: function() {
		return true;
	}
});