//Google Map	
(function($){
	if( $("div").is('#map-canvas')){
		var map;
			function initialize() {
			 // Create an array of styles.
			  var styles = [
				{
				  stylers: [
					{ hue: "#2d63c6" },
					{ saturation: -60 },
					{ lightness: -10 }
				  ]
				},{
				  featureType: "road",
				  elementType: "geometry",
				  stylers: [
					{ lightness: 100 },
					{ visibility: "simplified" }
				  ]
				},{
				  featureType: "road",
				  elementType: "labels",
				  stylers: [
					{ visibility: "off" }
				  ]
				}
			  ];

			  // Create a new StyledMapType object, passing it the array of styles, as well as the name to be displayed on the map type control.
			  var styledMap = new google.maps.StyledMapType(styles,
				{name: "Styled Map"});
				
				// Map Coordinates

				var lat = document.getElementById("mapCoordLat").getAttribute("value");
				var lng = document.getElementById("mapCoordLng").getAttribute("value");
				var myLatlng = new google.maps.LatLng(lat,lng);
				var mapOptions = {
					zoom: 16,
					center: myLatlng,
					scrollwheel: false,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
				
				//Marker Coordinates
				 var marker = new google.maps.Marker({
				  position:  new google.maps.LatLng(lat,lng),
				  map: map
				});
				
				map.mapTypes.set('map_style', styledMap);
				map.setMapTypeId('map_style');
			}
		
			google.maps.event.addDomListener(window, 'load', initialize);
	}
})(jQuery);