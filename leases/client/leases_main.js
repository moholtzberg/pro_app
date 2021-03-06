Template.leases_list.helpers({
	
	pagination: function () {
		if (!Session.get("page")) {
			Session.set("page", 1)
		};
		var pages = Math.ceil(Leases.find({lease_end_date: {$gte: Session.get("rangeStart"), $lt: Session.get("rangeEnd")} }).count() / 15);
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
	},
	
})

Template.leases_list.rendered = function() {
	$('.input-daterange').datepicker({});
}

Deps.autorun(function(){
	Meteor.subscribe("Leases", function(){
		Session.set("leasesReady", true)
	})
})