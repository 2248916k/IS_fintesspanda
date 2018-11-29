var mymap = L.map('map').setView([55.8735769,-4.2947745], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);

var popup = L.popup();

function onMapClick(e) {
    var coors=e.latlng;
    var lat=parseInt(coors["lat"]);//.toFixed(20);
   console.log("click");

    var lon=parseInt(coors["lng"]);//.toFixed(20);
    var from_track=false;
    var hr,cad;
    var track = JSON.parse(localStorage.getItem("track"));
    //console.log(track[0]["lon"]);
    for(i=0;i<track.length;i++){
         var trklat=parseInt(track[i]["lat"]);
         if(trklat==lat){
             var trklon=parseInt(track[i]["lon"]);
             if(trklon==lon){
                 hr=track[i]["hr"];
                 cad=track[i]["cad"];
                 from_track=true;
                 break;

             }
         }
    }

    if(from_track==false){

    console.log(coors);
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
    }else{
    popup
        .setLatLng(e.latlng)
        .setContent("Heart rate was:" + parseInt(hr).toFixed(0)+"  Cadence was: "+parseInt(cad).toFixed(0))
        .openOn(mymap);
    }
}

mymap.on('click', onMapClick);