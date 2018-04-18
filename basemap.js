
let myMap = L.map("mapdiv");
//let url = "https://maps.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png";

let myLayers = {


osm : L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    subdomains : ["a","b","c"],
    attribution : "Datenquelle: <a href=' https://www.basemap.at'>basemap.at</a>"
         }),

geolandbasemap : L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
subdomains : ["maps","maps1","maps2","maps3","maps4"],
attribution : "Datenquelle: <a href=' https://www.basemap.at'>basemap.at</a>"
     }
),


bmapoverlay : L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
    subdomains : ["maps","maps1","maps2","maps3","maps4"],
    attribution : "Datenquelle: <a href=' https://www.basemap.at'>basemap.at</a>"
         }),

bmaporthofoto30cm : L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
    subdomains : ["maps","maps1","maps2","maps3","maps4"],
    attribution : "Datenquelle: <a href=' https://www.basemap.at'>basemap.at</a>"
         }),

bmaphidpi : L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
    subdomains : ["maps","maps1","maps2","maps3","maps4"],
    attribution : "Datenquelle: <a href=' https://www.basemap.at'>basemap.at</a>"
         }),

bmapgrau : L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
    subdomains : ["maps","maps1","maps2","maps3","maps4"],
    attribution : "Datenquelle: <a href=' https://www.basemap.at'>basemap.at</a>"
         }),

};

myMap.addLayer(myLayers.bmapgrau);


let myMapControl = L.control.layers({
    "Openstreetmap" : myLayers.osm,
    "basemap.at Grundkarte" : myLayers.geolandbasemap,
    "basemap.at Overlay" : myLayers.bmapoverlay,
    "basemap.at Grau" : myLayers.bmapgrau,
    "basemap.at Orthophoto" : myLayers.bmaporthofoto30cm,
    "basemap.at bmaphidpi" : myLayers.bmaphidpi,

},{
    "basemap.at Overlay" : myLayers.bmapoverlay,
});


myMap.addControl(myMapControl);



myMap.setView([47.267,11,383], 11);






 
 



