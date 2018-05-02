
let myMap = L.map("mapdiv"); //http://leafletjs.com/reference-1.3.0.html#map-l-map

//let url = "https://maps.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png";

let markerGroup = L.featureGroup();   //marker gruppieren und als eigene Ebene einfügen

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
    "Marker": markerGroup,  // Marker als wegschaltbare Ebene
});


myMap.addControl(myMapControl); //L.map.addControl



myMap.setView([47.264,11,385], 11); //http://leafletjs.com/reference-1.3.0.html#map-setview


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
    "basemap.at Overlay" : myLayers.bmapoverlay, //  <Object> overlays?
    

}, {
    collapsed : false
    // <Control.Layers options> options
}); 

//comment: "metric" befehl leider trotz bemühen nicht geschafft.... ;(

const uni = [47.264, 11.385]; // variable erstellen (quasi als fixe location in den Befehlen)
const usi = [47.257, 11.356];
const technik = [47.263, 11.343]
const igls = [47.230, 11.409]
const patscherkofel = [47.208, 11.461]

myMap.addLayer(markerGroup);

const markerOptions = {
    title: "Universität Innsbruck",
    opacity: 0.6,
    draggable: true
} // variable für die einstellungen der makrer erstellen (einheitlich


L.marker(uni, markerOptions).addTo(markerGroup);  //marker in die Karte und konfigurieren ihn gleich
L.marker(usi, markerOptions).addTo(markerGroup)  // wichtig addTo in markerGroup ändern
L.marker(technik, markerOptions).addTo(markerGroup)
L.marker(igls, markerOptions).addTo(markerGroup)  
L.marker(patscherkofel, markerOptions).bindPopup("<h1>Patscherkofel</h1>").addTo(markerGroup).openPopup 

myMap.setView(uni, 14);

myMap.fitBounds(markerGroup.getBounds());


//const patscherkofelPic = "https://apps.tirol.gv.at/luft/patscherkofel.jpg";  
//L.marker(igls).addTo(markerGroup);
//war nur ein versuch und wird nicht benötigt


//Popup Bild einfügen


let patscherkoflMarker = L.marker(patscherkofel).addTo(markerGroup); // variable mit den Coordinaten der const "patscherkofel" und zur markerGroup hinzufügen
patscherkoflMarker.bindPopup("<p>Der Patscherkofel ist sexy</p><img style='width:200px' src='https://apps.tirol.gv.at/luft/patscherkofel.jpg' alt='Patscherkofl' />"); 
// Achtung bei anführungszeichen keine Zeilenumbrüche

let neueBahn = L.polyline([igls, patscherkofel], {
    color : 'blue'

});

myMap.addLayer(neueBahn);

let uniPolygon = L.polygon([uni,usi,technik], {
    color: 'red'

});

myMap.addLayer(uniPolygon)
uniPolygon.bindPopup("Ende")

myMap.fitBounds(markerGroup.getBounds());