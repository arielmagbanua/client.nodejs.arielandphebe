
var google;

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    // var myLatlng = new google.maps.LatLng(40.71751, -73.990922); ,
    var canaRetreatCoordinates = new google.maps.LatLng(9.448866, 123.2352293);

    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 15,

        // The latitude and longitude to center the map (always required)
        center: canaRetreatCoordinates,

        // How you would like to style the map. 
        scrollwheel: false,
        // styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#b1b881"},{"lightness":100}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#b1b881"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#b1b881"},{"lightness":90}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#b1b881"},{"lightness":50},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#b1b881"},{"lightness":25}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#b1b881"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#b1b881"},{"lightness":7}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#b1b881"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#b1b881"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#b1b881"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#b1b881"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#b1b881"},{"lightness":17}]}]
    };


    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
    var canaRetreatMarker = new google.maps.Marker({
        position: canaRetreatCoordinates,
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'Cana Retreat'
    });

    var infowindow = new google.maps.InfoWindow({
        content: `
            <div>
                <h4>Cana Retreat</h4>
                <p>Tandayag, Amlan, Negros Oriental Amlan, Negros Oriental</p>
            </div>
        `
    });

    canaRetreatMarker.addListener('click', function () {
        infowindow.open(map, canaRetreatMarker);
    });
}

google.maps.event.addDomListener(window, 'load', init);