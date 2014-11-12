Model = function (doc) {
  _.extend(this, doc);
};

Model.prototype = {
  constructor: Model,
	
	// model_name: function () {
	// 	var self = this;
	// 	return !self.dg_info ? self.model_name: self.dg_info.Model
	// },
	
	make: function () {
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		return Makes.findOne({dg_make_id: self.model_make_id});
	}

};

Models = new Meteor.Collection("models", {
	transform: function (doc) {
		return new Model(doc);
	}
});

Models.allow({
	insert: function() {
		return true;
	},
	
	update: function() {
		return true;
	}
});