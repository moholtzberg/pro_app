Template.customers_map.rendered = function() {
	$("#map-canvas").height(document.body.clientHeight - 80 + "px");
	
	function addMarker(title, location, id, color, map) {
		var marker = new google.maps.Marker({
			position: location,
			map: map,
			title: title,
			icon: "http://maps.google.com/mapfiles/ms/icons/" + color + "-dot.png"
		});
		markers.push(marker);
		var infowindow = new google.maps.InfoWindow({
			content: Blaze.toHTMLWithData(Template.customer_map_info_window, {customer: Customers.findOne(id)})
		});
		google.maps.event.addListener(marker, 'click', function() {
			Session.set("recordId", id);
			infowindow.open(map, marker)
		});
	}
	
	function setAllMap(map) {
		for (var i = 0; i < markers.length; i++) {
			// console.log(markers[i])
			markers[i].setMap(map);
		}
	}
	
	function clearMarkers() {
		setAllMap(null);
		markers = []
		// infoWindows = []
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
	var infoWindows = [];
	var myLocation = setMyLocation()
	
	if (!this.rendered) {
		
		Tracker.autorun(function(){
			
			var mapOptions = {
				zoom: 14,
				center: setMyLocation(),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			if (myLocation) {
				map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
				var marker = new google.maps.Marker({
					position: myLocation,
					map: map,
					title: "My Location",
					icon: "http://maps.google.com/mapfiles/ms/icons/arrow.png"
				});
			};
		
			Tracker.autorun(function(){
				// var myLocation = setMyLocation()
				clearMarkers()
				marker.setMap(map)
				Customers.find({customer_group_id: {$in: [Session.get("group_filter")]}}).forEach(function(customer) {
					// console.log(customer.name() + " ==> " + customer.loc + " ==> " + customer.customer_group_id)
					if (customer.loc && customer.loc.lat && customer.loc.lng) {
						addMarker(customer.name(), customer.loc, customer._id,"blue", map)
					} else {
						customer.UpdateGeoLocation()
					}
				});
				// console.log(markers[0])
				setAllMap(map)
			})
		this.rendered = true;
		})
	};
	
}