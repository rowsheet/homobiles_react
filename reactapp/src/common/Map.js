export class Map extends React.Component {

    constructor(props) {
        super(props);
        this.initMap = this.initMap.bind(this);
        this.handleLocationError = this.handleLocationError.bind(this);
    }

    render() {
        return (
<div style={{
    background: "lightcyan",
    height: "100%",
    width: "100%",
    position: "relative",
}}>
    <div id="map" style={{
        background: "lavender",
        width: "100%",
        height: "100%",
    }}></div>
</div>
        )
    }

    componentDidMount() {
        console.log("Mounted...");
        this.initMap();
    }

    initMap() {
        var map, infoWindow;

        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                infoWindow.open(map);
                map.setCenter(pos);
            }, function() {
                this.handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            this.handleLocationError(false, infoWindow, map.getCenter());
        }
    }

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesnt support geolocation.');
        infoWindow.open(map);
    }
}

export default Map
