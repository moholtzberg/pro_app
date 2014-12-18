Template.customers_map.rendered = function() {
	$("#map-canvas").height(document.body.clientHeight - 100 + "px");
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(p) {
			Session.set("myLat", p.coords.latitude);
			Session.set("myLng", p.coords.longitude);
		});
	}
	
	if (!this.rendered) {
		
		var map
		var markers = new L.FeatureGroup();
		
		function addMarker(location, id, map, markers) {
			var marker = new L.Marker(location, {
				_id: Customers.findOne(id)
			});
			map.addLayer(marker);
			marker.bindPopup(Blaze.toHTMLWithData(Template.customer_map_info_window, {customer: Customers.findOne(id)}))
			markers.addLayer(marker);
		}
		
		function setAllMap(map) {
			console.log(map)
			for (var i = 0; i < markers.length; i++) {
				markers[i].addTo(map);
			}
		}
		
		function clearMarkers(map, markers) {
			map.removeLayer(markers);
			markers.clearLayers()
		}
		
		function updateSub() {
			var bounds = map.getBounds()
			var boundObject = { 
				southWest: [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
				northEast: [bounds.getNorthEast().lat, bounds.getNorthEast().lng] 
			}
			if (MapBounds.find().count() < 1) {
				MapBounds.insert(boundObject);
			} else {
				MapBounds.update({}, boundObject);
			}
			Meteor.subscribe('CustomersByGeolocation', MapBounds.findOne());
			console.log("bounds changed")
		}
		
		map = L.map('map-canvas').setView([Session.get("myLat"), Session.get("myLng")], 13);
		var googleLayer = new L.Google('ROADMAP');
		map.addLayer(googleLayer);
		
		Tracker.autorun(function(){
			clearMarkers(map, markers)
			Customers.find({customer_group_id: {$in: [Session.get("group_filter")]}}).forEach(function(customer){
				addMarker(customer.loc, customer._id, map, markers)
			});
			map.addLayer(markers);
		})
		
		map.on("moveend", updateSub)
		
		this.rendered = true;
	}
	
	// function addMarker(title, location, id, color, map) {
	// 	var marker = new google.maps.Marker({
	// 		position: location,
	// 		map: map,
	// 		title: title,
	// 		icon: "http://maps.google.com/mapfiles/ms/icons/" + color + "-dot.png"
	// 	});
	// 	markers.push(marker);
	// 	var infowindow = new google.maps.InfoWindow({
	// 		content: Blaze.toHTMLWithData(Template.customer_map_info_window, {customer: Customers.findOne(id)})
	// 	});
	// 	google.maps.event.addListener(marker, 'click', function() {
	// 		Session.set("recordId", id);
	// 		infowindow.open(map, marker)
	// 	});
	// }
	// 
	// function setAllMap(map) {
	// 	for (var i = 0; i < markers.length; i++) {
	// 		markers[i].setMap(map);
	// 	}
	// }
	// 
	// function clearMarkers() {
	// 	setAllMap(null);
	// 	markers = []
	// }
	// 
	// function setMyLocation() {
	// 	if (navigator.geolocation) {
	// 		navigator.geolocation.getCurrentPosition(function(p) {
	// 			Session.set("myLat", p.coords.latitude);
	// 			Session.set("myLng", p.coords.longitude);
	// 		});
	// 		return new google.maps.LatLng(Session.get("myLat"), Session.get("myLng"));
	// 	}
	// }
	// 
	// var map;
	// var markers = [];
	// var infoWindows = [];
	// var myLocation = setMyLocation()
	// 
	// if (!this.rendered) {
	// 	
	// 	var mapOptions = {
	// 		zoom: 14,
	// 		center: setMyLocation(),
	// 		mapTypeId: google.maps.MapTypeId.ROADMAP
	// 	};
	// 	
	// 	if (myLocation) {
	// 		map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	// 		var marker = new google.maps.Marker({
	// 			position: myLocation,
	// 			map: map,
	// 			title: "My Location",
	// 			icon: "http://maps.google.com/mapfiles/ms/icons/arrow.png"
	// 		});
	// 	};
	// 	
	// 	Tracker.autorun(function(){
	// 	
	// 		Tracker.autorun(function(){
	// 			clearMarkers()
	// 			marker.setMap(map)
	// 			google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
	// 				var bounds = map.getBounds(), boundObject = { 
	// 					southWest: [bounds.getSouthWest().lat(), bounds.getSouthWest().lng()],
	// 					northEast: [bounds.getNorthEast().lat(), bounds.getNorthEast().lng()] 
	// 				};
	// 				
	// 				if (MapBounds.find().count() < 1) {
	// 					MapBounds.insert(boundObject);
	// 				} else {
	// 					MapBounds.update({}, boundObject);
	// 				}
	// 				
	// 				Meteor.subscribe('CustomersByGeolocation', MapBounds.findOne());
	// 			})
	// 			
	// 			Customers.find({customer_group_id: {$in: [Session.get("group_filter")]}}).forEach(function(customer) {
	// 				if (customer.loc && customer.loc.lat && customer.loc.lng) {
	// 					addMarker(customer.name(), customer.loc, customer._id,"blue", map)
	// 				} else {
	// 					customer.UpdateGeoLocation()
	// 				}
	// 			});
	// 			
	// 			setAllMap(map)
	// 			
	// 		})
	// 		
	// 		google.maps.event.addListener(map, 'zoom_changed', function(){
	// 			var bounds = map.getBounds(), boundObject = { 
	// 				southWest: [bounds.getSouthWest().lat(), bounds.getSouthWest().lng()],
	// 				northEast: [bounds.getNorthEast().lat(), bounds.getNorthEast().lng()] 
	// 			};
	// 						
	// 			if (MapBounds.find().count() < 1) {
	// 				MapBounds.insert(boundObject);
	// 			} else {
	// 				MapBounds.update({}, boundObject);
	// 			}
	// 			Meteor.subscribe('CustomersByGeolocation', MapBounds.findOne());
	// 		})
	// 	
	// 	})
	// 	
	// 	this.rendered = true;
	// 
	// };
	
}