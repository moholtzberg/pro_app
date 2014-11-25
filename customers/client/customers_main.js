Template.customers_list.helpers({
	filters: function () {
		var filter = Session.get("filter")
		var start = "a"
		var end = "z"
		var filters = new Array();
		for (var i=start.charCodeAt(); i <= end.charCodeAt(); i++) {
			filters.push(String.fromCharCode(i));
		};
		return filters
	},
	pagination: function () {
		if (!Session.get("page")) {
			Session.set("page", 1)
		};
		var pages = Math.ceil(Customers.find({customer_name: {$regex: "^"+Session.get("filter")+".*", $options: "i"}}).count() / 15);
		var page = parseInt(Session.get("page"));
		var pagination = new Array();
		var range = parseInt(Session.get("range")) || 10;
		if (pages > range) {
			if (page === 1) {
				min = 1;
				max = range;
			} else if(page > 1 && page < pages) {
				min = Math.max(1, page - (Math.floor((range-1) /2)));
				max = Math.min(pages, page + (Math.ceil((range-1) /2)));
				if (range - (max-min) > 0) {
					var off = range - (max-min);
					if (min - off < 1) {
						max = max + off - 1;
					} else if(max + off > pages) {
						min = min - off + 1;
					};
				} 
			} else if(page === pages) { 
				min = ((pages - range) + 1);
				max = pages;
			};
			
		} else {
			min = 1;
			max = pages;
		}	
		
		for (var i = min; i < max+1; i++) {
			if (i >= min && i <= max) {
				pagination.push(i.toString())
			}
		};
		return pagination;	
	}
});

Template.infoWindow.helpers({
	record: function() {
		return Customers.findOne({_id: Session.get("recordId")});
	}
});

// Template.customers_page.helpers({
// 	record: function() {
// 		return Customers.findOne({_id: Session.get("recordId")});
// 	}
// });

Template.customers_form.helpers({
	users: function() {
		return Users.find({active: true});
	},
	groups: function() {
		return Groups.find({active: true, group_type: "customers"});
	}
});

Template.customers_form.rendered = function() {
	$(function() {
	    $('select#customer_user_id').selectize()[0].selectize.setValue(Customers.findOne({_id: Session.get("recordId")}).customer_user_id)
	});
	$(function() {
	    $('select#customer_group_id').selectize()[0].selectize.setValue(Customers.findOne({_id: Session.get("recordId")}).customer_group_id)
	});
}

Meteor.subscribe("Customers", function(){
	Session.set("customersReady", true)
})