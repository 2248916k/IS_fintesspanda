var radius = 6378137.0 ; // earth radius in meter
var DE2RA = 0.01745329252; // degre to radian conversion
function loadData(){
    var dist=0;

    var track = JSON.parse(localStorage.getItem("track"));
    var totalHR=parseInt(track[0]["hr"]);
    for(i=1; i<track.length; i++){
        dist+=calcDist(track[i-1]["lat"],track[i-1]["lon"],track[i]["lat"],track[i]["lon"]);
        totalHR+=parseInt(track[i]["hr"]);
        //console.log(totalHR);
    }
    //console.log(track.length)

    document.getElementById("dist").innerHTML="Distance: "+dist.toFixed(2)+"m";
    //2017-06-07T12:55:10.000Z
    var start=new Date(track[0]["time"]);
    var end=new Date(track[track.length-1]["time"]);
    //console.log(start,end,random);
    var diff = Math.abs(end-start)/60000;
   // console.log(diff);
    document.getElementById("time").innerHTML="Duration: "+diff+"min";
    localStorage.setItem("duration",diff);
    var avgHR=totalHR/(track.length);
    document.getElementById("avghr").innerHTML="Average hr: "+avgHR.toFixed(0)+"bpm";


}
// return the distance between (lat1,lon1) and (lat2,lon2) in meter.
function calcDist(lat1, lon1, lat2, lon2) {
    if (lat1 == lat2 && lon1 == lon2) return 0;
    lat1 *= DE2RA;
    lon1 *= DE2RA;
    lat2 *= DE2RA;
    lon2 *= DE2RA;
    var d = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2);
    return (radius * Math.acos(d));
}