    $("#fileinput").change(function() {
        $("#load").prop('disabled',false);
         $("#submit").prop('disabled',false);
         $("#table").prop('hidden',false);
          $("#myCanvas").prop('hidden',false);

        loadFile($("#fileinput")[0], function(xml){
        var xmlDoc = new DOMParser().parseFromString(xml, "text/xml");
        //var xmlDoc = xml;
        var trkpt = {};
        var trkseg = [];
        var pointList=[]; //coordinates for drawing track

        // if (xmlDoc.getElementsByTagName("type")[0].childNodes[0].nodeValue ==="running"){
        try{
          var heartRatesCad=[]; //hr for drawing graphs
          var cadence=[];
          var type = xmlDoc.getElementsByTagName("type");
          if (type.length !== 0){
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

            generate_graph(cadence,"Heart rate vs Cadence",heartRatesCad,"Cadence");
         }
         else{
           var durations=[];
           var hrDuration=[];
           var start=0;
           for (i = 0; i < xmlDoc.getElementsByTagName("trkpt").length; i++) {
              trkpt = {
              "lat": parseFloat(xmlDoc.getElementsByTagName("trkpt")[i].attributes["lat"].value),
              "lon": xmlDoc.getElementsByTagName("trkpt")[i].getAttributeNode("lon").nodeValue,
              "ele": xmlDoc.getElementsByTagName("ele")[i].childNodes[0].nodeValue,
              "time":xmlDoc.getElementsByTagName("time")[i].childNodes[0].nodeValue,
              "hr": xmlDoc.getElementsByTagName("gpxtpx:hr")[i].childNodes[0].nodeValue,
              };
              // if(xmlDoc.getElementsByTagName("trkpt").childNodes[2][0][0])
              if(i==0){
                  start=new Date(trkpt["time"]);

              }
              trkseg.push(trkpt);
              pointList.push(new L.LatLng(trkpt["lat"],trkpt["lon"]));

              if(i%60==0){
                 var time=new Date(trkpt["time"]);
                 var diff=Math.round((Math.abs(time-start))/60000);
                // console.log(diff,trkpt["hr"]);
                 var p={x:diff,y:(parseInt(trkpt["hr"]))};
                // console.log(point[x],point[y]);
                 hrDuration.push(p);
                 durations.push(diff);
              }
           }

           generate_graph(durations,"Heart rate vs duration",hrDuration,"Duration, min");
           // for (i = 0; i < xmlDoc.getElementsByTagName("gpxtpx:atemp").length; i++) {
           //   trkseg[i]["atemp"] = xmlDoc.getElementsByTagName("gpxtpx:hr")[i].childNodes[0].nodeValue;
           // }
        }
        //test=[1,2,3];
        //console.log(test[0]);
        // console.log(trkseg[1]["atemp"]);
        localStorage.setItem("track",JSON.stringify(trkseg));
        //localStorage.setItem("test",JSON.stringify(test));
        //localStorage.setItem("trackk",'5');
        //draw track
        mymap.setView([trkseg[0]["lat"], trkseg[0]["lon"]], 13);
        var firstpolyline = new L.Polyline(pointList, {
            color: 'rgb(255, 99, 132)',
            weight: 10,
            opacity: 0.8,
            smoothFactor: 1
        });
      }
      catch(err){
        alert("Invalid file");
        console.log(err.message);
        return;
      }
    firstpolyline.addTo(mymap);

    //drawing graph

    //canvas.width  = 50;
    //canvas.height = 50;
    //canvas.style.width  = '100px';
    //canvas.style.height = '180px';


});

});

function generate_graph(labels,label,data, xString){

var canvas = document.getElementsByTagName('canvas')[0];
var ctx2 = document.getElementById('myLine').getContext('2d');
canvas.style.backgroundColor='seashell';
canvas.style.border='1px solid black';
var chart2 = new Chart(ctx2, {
    // The type of chart we want to create
    type: 'line',
    responsive:true,

    // The data for our dataset
    data: {
        labels:labels,
        datasets: [{
            label: label,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: data,
            fill:false,
        }]
    },

    // Configuration options go here
    options: {
        scales: {
                yAxes: [{
                    ticks: {
                        autoSkip:true,
                    },
                scaleLabel:{
                    display:true,
                    labelString:"Heart Rate, bpm",

                }

                }],
                xAxes: [{
                    ticks: {

                        autoSkip:true,
                    },
                scaleLabel:{
                    display:true,
                    labelString:xString,

                }

                }]

        }
    }


});


}