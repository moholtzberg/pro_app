Template.customers_map.rendered = function() {
	$("#map-canvas").height(document.body.clientHeight - 80 + "px");
	
	function addMarker(title, location, id, color, map) {
		var marker = new google.maps.Marker({
			position: location,
			map: map,
			title: title,
			icon: "http://maps.google.com/mapfiles/ms/icons/" + color + "-dot.png"
		});
		google.maps.event.addListener(marker, 'click', function() {
			Session.set("recordId", id);
		});
		markers.push(marker);
	}
	
	function setAllMap(map) {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(map);
		}
	}
	
	function clearMarkers() {
		setAllMap(null);
		markers = []
	}
	
	function setMyLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(p) {
				Session.set("myLat", p.coords.latitude);
				Session.set("myLng", p.coords.longitude);
			});
			return new google.maps.LatLng(Session.get("myLat"), Session.get("myLng"));
		}
	}
	
	var map;
	var markers = [];

	if (!this.rendered) {
		
		Tracker.autorun(function(){
			var myLocation = setMyLocation()
			var mapOptions = {
				zoom: 14,
				center: myLocation,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			if (myLocation) {
				map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
			};
		
		Tracker.autorun(function(){
			var myLocation = setMyLocation()
			clearMarkers()
			var marker = new google.maps.Marker({
				position: myLocation,
				map: map,
				title: "My Location",
				icon: "http://maps.google.com/mapfiles/ms/icons/arrow.png"
			});
			marker.setMap(map)
		
			Customers.find({customer_group_id: {$in: [Session.get("group_filter")]}}).forEach(function(customer) {
				console.log(customer.name() + " ==> " + customer.loc + " ==> " + customer.customer_group_id)
				if (customer.loc && customer.loc.lat && customer.loc.lng) {
					addMarker(customer.name(), customer.loc, customer._id,"blue", map)
				} else {
					customer.UpdateGeoLocation()
				}
			});
		
			console.log(markers)
			setAllMap(map)
		
		})
		this.rendered = true;
		})
	};
	
	
}