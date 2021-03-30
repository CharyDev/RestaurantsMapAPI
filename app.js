var map;

function initMap() {  
    var position = { 
        center: { lat: 13.8029919, lng: 100.5390271 },
        zoom:15
    };  
    
    //map = new google.maps.Map(document.getElementById('map'), position);  

        map = new google.maps.Map(document.getElementById('map'), {
            center: position,
            zoom: 15
        });
    
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location : position,
            radius : 5500,
            type : ["restaurant"]
        }, callback);
    
    
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
    
            var marker, i;
    
            for (i = 0; i < results.length; i++) {  
                marker = new google.maps.Marker({
                  position: new google.maps.LatLng(results[i].geometry.location.lat(), results[i].geometry.location.lng()),
                  map: map
                });
    
                google.maps.event.addListener( marker, 'click', ( 
                    function( marker, i ) {
                        return function() {
                            var infowindow = new google.maps.InfoWindow();
                            infowindow.setContent(results[i].name);
                            infowindow.open(map, marker);
                        }
                    }
                )(marker, i));
            }
        }
    }

    //Create search box from index.html
    const input = document.getElementById('search');       
    const searchBox =  new google.maps.places.SearchBox(input);   

    //list results from searchBox
    map.addListener('bounds_changed',() => {  
        searchBox.setBounds(map.getBounds());
    });

    var markers = []; 
    //when the user selects place
    searchBox.addListener('places_changed',()=>{ 
        var places = searchBox.getPlaces();

        if (places.length === 0){
            return;
        }
        
        //Clear old markers
        markers.forEach((m)=>{
            m.setMap(null);
        });

        markers = [];    
        //For each place   
        var bounds = new google.maps.LatLngBounds();  
        places.forEach((p)=>{        
            if(!p.geometry){
                return;
            } 

            // Create marker for each place.           
            markers.push(new google.maps.Marker({ 
                map: map,
                title: p.name,
                position: p.geometry.location               
            }));

            //geocodes have viewport.
            if (p.geometry.viewport) 
                bounds.union(p.geometry.viewport);               
            else
                bounds.extend(p.geometry.location);   
        });

        map.fitBounds(bounds);
    });
}


