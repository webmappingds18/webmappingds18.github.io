
let myMap = L.map("mapdiv");
//let url = "https://maps.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png";

let myLayers = {


osm : L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),

geolandbasemap : L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
subdomains : ["maps","maps1","maps2","maps3","maps4"],
attribution : "Datenquelle: <a href=' https://www.basemap.at'>basemap.at</a>"
     }
),


bmapoverlay : L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png"),

bmaporthofoto30cm : L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg"),

bmaphidpi : L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg"),

bmapgrau : L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png"),

};

myMap.addLayer(myLayers.geolandbasemap);
myMap.setView([47.267,11,383], 11);






 
 


myMap.addLayer(myLayer);
myMap.setView([47.267,11.383], 11);
