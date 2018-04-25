
let myMap = L.map("mapdiv"); //http://leafletjs.com/reference-1.3.0.html#map-l-map

//let url = "https://maps.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png";

let myLayers = {  //http://leafletjs.com/reference-1.3.0.html#tilelayer


osm : L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    subdomains : ["a","b","c"],
    attribution : "Datenquelle: <a href=' https://www.basemap.at'>basemap.at</a>"
         }),

geolandbasemap : L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
subdomains : ["maps","maps1","maps2","maps3","maps4"],  //http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
attribution : "Datenquelle: <a href=' https://www.basemap.at'>basemap.at</a>" // http://leafletjs.com/reference-1.3.0.html#layer-attribution
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

myMap.addLayer(myLayers.bmapgrau); //http://leafletjs.com/reference-1.3.0.html#map-addlayer


let myMapControl = L.control.layers({  //http://leafletjs.com/reference-1.3.0.html#control-layers
    "Openstreetmap" : myLayers.osm,
    "basemap.at Grundkarte" : myLayers.geolandbasemap,
    "basemap.at Overlay" : myLayers.bmapoverlay,
    "basemap.at Grau" : myLayers.bmapgrau,
    "basemap.at Orthophoto" : myLayers.bmaporthofoto30cm,
    "basemap.at bmaphidpi" : myLayers.bmaphidpi,

},{
    "basemap.at Overlay" : myLayers.bmapoverlay,
});


myMap.addControl(myMapControl); //L.map.addControl



myMap.setView([47.267,11,383], 11); //http://leafletjs.com/reference-1.3.0.html#map-setview


L.control.scale({
    position: 'bottomleft',
    maxWidth :200,
    imperial : false,
    metric : true,
}
).addTo(myMap); //http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale

L.control.layers({
    "Openstreetmap" : myLayers.osm,
    "basemap.at Grundkarte" : myLayers.geolandbasemap,
    "basemap.at Overlay" : myLayers.bmapoverlay,
    "basemap.at Grau" : myLayers.bmapgrau,
    "basemap.at Orthophoto" : myLayers.bmaporthofoto30cm,
    "basemap.at bmaphidpi" : myLayers.bmaphidpi,
    //  <Object> overlays?
},{
    "basemap.at Overlay" : myLayers.bmapoverlay,
    //  <Object> overlays?
}, {
    collapsed : false
    // <Control.Layers options> options
}); 

//comment: "metric" befehl leider trotz bemühen nicht geschafft.... ;(
