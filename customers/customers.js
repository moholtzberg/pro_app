Customer = function (doc) {
  _.extend(this, doc);
};

Customer.prototype = {
	constructor: Customer,
	
  owner: function () {
		user = Meteor.users.findOne({_id: this.user_id});
		// console.log(user);
		if(user) {
			return user.full_name();
		}
  }, 
	
	contacts: function () {
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		// console.log(Contacts.find({customer_id: self._id}).fetch());
		return Contacts.find({customer_id: self._id}).fetch();
	},
	
	activities: function () {
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		// console.log(Contacts.find({customer_id: self._id}).fetch());
		return Activities.find({customer_id: self._id}).fetch();
	},
	
	
	notContacted: function () {
		var contacts = this.contacts();
		for (var i=0; i < contacts.length; i++) {
			console.log(contacts[i].neverContacted());
		};
	},
	
	leases: function () {
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		// return Leases.find({customer_id: self._id}).fetch();
		return Modules.find().fetch()
	},
	
	equipments: function () {
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		return Equipments.find({dg_customer_id: self.dg_customer_id}).fetch();
	},
	
	full_address: function() {
		var self = this;
		var add = self.address() == null ? false : self.address();
		var cit = self.city() == null ? false : self.city();
		var sta = self.state() == null ? false : self.state();
		var zip = self.zip() == null ? false : self.zip();
		if (add && cit && sta && zip) {
			return add + ", " + cit + ", " + sta + " " + zip
		} 
	},
	
	name: function() {
		
		var self = this;
		// console.log(!self.dg_info ? self.customer_name: self.dg_info.CustomerName)
		return !self.dg_info ? self.customer_name: self.dg_info.CustomerName
	},
	
	address: function() {
		var self = this;
		return !self.dg_info ? self.customer_address : self.dg_info.Address
	},

	city: function() {
		var self = this;
		return !self.dg_info ? self.customer_city : self.dg_info.City
	},

	state: function() {
		var self = this;
		return !self.dg_info ? self.customer_state : self.dg_info.State
	},
	
	zip: function() {
		var self = this;
		return !self.dg_info ? self.customer_zip : self.dg_info.Zip
	},
	
	phone: function() {
		var self = this;
		return !self.dg_info ? self.customer_phone : self.dg_info.Phone1
	},
	
	fax: function() {
		var self = this;
		return !self.dg_info ? self.customer_fax : self.dg_info.Fax
	},
	
	active: function() {
		var self = this;
		return !self.dg_info ? self.customer_active : self.dg_info.Active
	},
	
	GeoLocation: function() {
		var self = this;
		if (!self.loc) {
			self.UpdateGeoLocation();
		} else {
			return self.loc;
		}
	},
	
	UpdateGeoLocation: function() {
		var self = this;
		if (Meteor.isServer) {
			var server_api_key = "AIzaSyD1c50Pm2aUnGvCxqbbVasMbqsFc_Crc7g"
			url = "https://maps.googleapis.com/maps/api/geocode/json?address=+" + encodeURIComponent(self.full_address())+ "&key=" + server_api_key;
			// console.log(url)
			HTTP.call("GET", url, function (e, r) {
				if (r.statusCode === 200 && r.data && r.data.results[0] && r.data.results[0].geometry) {
					console.log(r.data.results[0].geometry.location)
					var loc = {lat: r.data.results[0].geometry.location.lat, lng: r.data.results[0].geometry.location.lng}
					Customers.update({_id: self._id}, {$set: {loc: loc}});
				} else {
					console.log(self.name() + " ==>> " + self.full_address());
					console.log(r.data);
				}
			});
		} else {
			geocoder = new google.maps.Geocoder();
			geocoder.geocode({'address': self.full_address() }, function(results, status) {
				switch(status) {
					case google.maps.GeocoderStatus.OK:
						var loc = {lat: results[0].geometry.location.lat, lng: results[0].geometry.location.lng}
						Customers.update({_id: self._id}, {$set: {loc: loc}});
					break;
					case google.maps.GeocoderStatus.ZERO_RESULTS:
						console.log(self.name() + " ==>> " + self.full_address());
						console.log(url);
					break;
					default:
						console.log(self.name() + " ==>> " + self.full_address());
						console.log("An error occured while validating this address")
				}	
			})
		}
	}
};

Customers = new Meteor.Collection("customers", {
	transform: function (doc) {
		return new Customer(doc);
	}
});

Customers.allow({
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