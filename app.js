var map;

function initMap() {  


    var position = { 
        center: { lat: 13.8029919, lng: 100.5390271 },
        zoom:15
    }; 
    
    map = new google.maps.Map(document.getElementById('map'), position);  
	
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

