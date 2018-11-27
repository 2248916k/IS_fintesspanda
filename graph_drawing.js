var heartRatesCad=[]; //hr for drawing graphs
var cadence=[];
    $("#fileinput").change(function() {
        loadFile($("#fileinput")[0], function(xml){
        var xmlDoc = new DOMParser().parseFromString(xml, "text/xml");
        //var xmlDoc = xml;
        var trkpt = {};
        var trkseg = [];
        var pointList=[]; //coordinates for drawing track


       for (i = 0; i < xmlDoc.getElementsByTagName("trkpt").length; i++) {

          trkpt = {
          "lat": parseFloat(xmlDoc.getElementsByTagName("trkpt")[i].attributes["lat"].value),
          "lon": xmlDoc.getElementsByTagName("trkpt")[i].getAttributeNode("lon").nodeValue,
          "ele": xmlDoc.getElementsByTagName("ele")[i].childNodes[0].nodeValue,
          "time":xmlDoc.getElementsByTagName("time")[i].childNodes[0].nodeValue,
          "hr": xmlDoc.getElementsByTagName("ns3:hr")[i].childNodes[0].nodeValue,
          "cad": xmlDoc.getElementsByTagName("ns3:cad")[i].childNodes[0].nodeValue
          };
          trkseg.push(trkpt);
          pointList.push(new L.LatLng(trkpt["lat"],trkpt["lon"]));
          var point={x:trkpt["cad"],y:trkpt["hr"]};
          heartRatesCad.push(point);
          if(i%10==0){
             cadence.push(trkpt["cad"]);
           }
        }
//test=[1,2,3];
//console.log(test[0]);
localStorage.setItem("track",JSON.stringify(trkseg));
//localStorage.setItem("test",JSON.stringify(test));
//localStorage.setItem("trackk",'5');
//draw track
mymap.setView([trkseg[0]["lat"], trkseg[0]["lon"]], 13);
var firstpolyline = new L.Polyline(pointList, {
    color: 'red',
    weight: 3,
    opacity: 0.8,
    smoothFactor: 1
});
firstpolyline.addTo(mymap);

//drawing graph
var canvas = document.getElementsByTagName('canvas')[0];
//canvas.width  = 50;
//canvas.height = 50;
//canvas.style.width  = '100px';
//canvas.style.height = '180px';

var ctx2 = document.getElementById('myLine').getContext('2d');
canvas.style.backgroundColor='white';
var chart2 = new Chart(ctx2, {
    // The type of chart we want to create
    type: 'line',
    responsive:true,

    // The data for our dataset
    data: {
        labels:cadence,
        datasets: [{
            label: "Heart rate vs Cadence",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: heartRatesCad,
            fill:false,
        }]
    },

    // Configuration options go here
    options: {
        scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                       // callback: function(value, index, values) {
                         //   return '$' + value;
                        //}
                        autoSkip:true,
                    },
                scaleLabel:{
                    display:true,
                    labelString:"Heart Rate, bpm",

                }

                }],
                xAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                       // callback: function(value, index, values) {
                         //   return '$' + value;
                        //}
                        autoSkip:true,
                    },
                scaleLabel:{
                    display:true,
                    labelString:"Cadence",

                }

                }]

        }
    }


});
//ctx2.style.backgroundColor='rgba(255,0,0,255)';
});

});



