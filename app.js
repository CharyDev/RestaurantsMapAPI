var map;

function initMap() {  
    var position = { 
        center: { lat: 13.847860, lng: 100.604274 },
        zoom:20
    };  

    map = new google.maps.Map(document.getElementById('map'), position);  
    
    // google.maps.event.addListener(map,'click',function(event){
    //     alert(event.latLng);
    // });

    var input = document.getElementById('search');
    var searchBox =  new google.maps.places.SearchBox(input);

 

    map.addListener('bounds_changed',function(){
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    searchBox.addListener('places_changed',function(){
        var places = searchBox.getPlaces();

        if (places.length === 0)
            return;
        markers.forEach(function(m){m.setMap(null);});
        markers = [];

        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(p){        
            if(!p.geometry)
            return;
            markers.push(new google.maps.Marker({
                map: map,
                title: p.name,
                position: p.geometry.location
            }));

            if (p.geometry.viewport)
                bounds.union(p.geometry.viewport);
            else
                bounds.extend(p.geometry.location);   
        });

        //test
        // var ptest = new google.maps.event.addListener(map,'click',function(event){
        //     alert(event.latLng);
        //     });
        
        //     console.log(ptest);
        //test
        map.fitBounds(bounds);
    });
}
