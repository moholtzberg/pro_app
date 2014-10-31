MapBounds = new Meteor.Collection(null);

Template.customers_map.rendered = function() {
	// if (document.body.clientHeight < 461) {
	// 	$("#map-canvas").height("250px");
	// } else {
	// 	$("#map-canvas").height("400px");
	// };
	
	$("#map-canvas").height(document.body.clientHeight - 180 + "px");
	
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(p) {
			Session.set("myLat", p.coords.latitude);
			Session.set("myLng", p.coords.longitude);
		});
	}
	if (!this.rendered) {
		Tracker.autorun(function(){
		
			var mapOptions = {
				center: new google.maps.LatLng(Session.get("myLat"), Session.get("myLng")),
				zoom: 15,
				zoomControl: true,
				zoomControlOptions: {style: google.maps.ZoomControlStyle.LARGE},
				streetViewControl: true,
				mapTypeControl: false,
				scaleControl: false,
				mapTypeId: google.maps.MapTypeId.ROADMAP
				
			}

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(Session.get("myLat"), Session.get("myLng")),
				title:'My Location',
				icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
			})

			map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
		
			marker.setMap(map);
		
			google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
				console.log("loaded")
				var bounds = map.getBounds(), boundObject = { 
					southWest: [bounds.getSouthWest().lat(), bounds.getSouthWest().lng()],
					northEast: [bounds.getNorthEast().lat(), bounds.getNorthEast().lng()] 
				};
			
				if (MapBounds.find().count() < 1) {
					MapBounds.insert(boundObject);
				} else {
					MapBounds.update({}, boundObject);
				}
			
				Meteor.subscribe('CustomersByGeolocation', MapBounds.findOne(), Session.get("mapFilter"), function(){
					// console.log(this.ready())
					// console.log(MapBounds.findOne());
				});
			
			})
		
			Tracker.autorun(function(){
			
				Customers.find().forEach(function(customer) {
					if (customer.loc != null) {
						var marker = new google.maps.Marker({
							position: new google.maps.LatLng(customer.loc.lat, customer.loc.lng),
							title: customer.name(),
							icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
						});
						marker.setMap(map);
						google.maps.event.addListener(marker, 'click', function() {
							Session.set("recordId", customer._id);
						});
					}
				});
			
			})
		
			google.maps.event.addListener(map, 'idle', function(){
				var bounds = map.getBounds(), boundObject = { 
					southWest: [bounds.getSouthWest().lat(), bounds.getSouthWest().lng()],
					northEast: [bounds.getNorthEast().lat(), bounds.getNorthEast().lng()] 
				};
			
				if (MapBounds.find().count() < 1) {
					MapBounds.insert(boundObject);
				} else {
					MapBounds.update({}, boundObject);
				}
			
				Meteor.subscribe('CustomersByGeolocation', MapBounds.findOne(), Session.get("mapFilter"), function(){});
			})
		
		})
		this.rendered = true;
	}
}