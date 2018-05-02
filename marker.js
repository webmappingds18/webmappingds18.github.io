let myMap = L.map("mapdiv"); // http://leafletjs.com/reference-1.3.0.html#map-l-map
let markerGroup = L.featureGroup(); // Gruppe fuer Marker
let myLayers = {
    osm : L.tileLayer( // http://leafletjs.com/reference-1.3.0.html#tilelayer-l-tilelayer
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { 
        // subdomains: ['a', 'b', 'c'], // subdomains hinzugefügt
        attribution : "Datenquelle: <a href='https://www.openstreetmap.org'>OpenStreetMap"
        }
    ),
    //* {s} steht sämtliche subdomain - maps,1,2,3,4
    geolandbasemap : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],  //http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" // http://leafletjs.com/reference-1.3.0.html#tilelayer-attribution
    }
    // attribution = Datenquelle (Vorgegeben wie man es angeben muss )
    ),
    bmapoverlay :  L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at"
    }
    ),
    bmapgrau : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at"
    }
    ),
    bmaphidpi : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at"
    }
    ),
    bmaporthofoto30cm : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg",{
        subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at"
    }
    ),
   
}
myMap.addLayer(myLayers.geolandbasemap); // http://leafletjs.com/reference-1.3.0.html#layergroup-addlayer

let myMapControl = L.control.layers({ //http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "OpenStreetMap" : myLayers.osm,
    "basemap.at Grundkarte" : myLayers.geolandbasemap,
   
    "basemap.at grau" : myLayers.bmapgrau,
    "basemap.at highdpi" : myLayers.bmaphidpi,
    "basemap.at Orthofoto" : myLayers.bmaporthofoto30cm,
},{
    "basemap.at Overlay" : myLayers.bmapoverlay,
    "Marker" : markerGroup,
});
myMap.addControl(myMapControl); //http://leafletjs.com/reference-1.3.0.html#map-addcontrol

myMapControl.expand() // Methode um My Controll Feld automatisch auszuklappen

// Einstellungen 11 = Zoomfaktor
myMap.setView([47.267,11.383],11); //http://leafletjs.com/reference-1.3.0.html#map-setview



// Massstab einfuegen
L.control.scale({       // http://leafletjs.com/reference-1.3.0.html#control-scale
    maxWidth: 200,      // http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
    metric: true,       // http://leafletjs.com/reference-1.3.0.html#control-scale-metric
    imperial: false     // http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
}).addTo(myMap);

const uni = [47.264,11.385];
const usi = [47.257,11.356];
const technick = [47.263,11.343];
const igls = [47.229,11.414]
const patscherkofel = [47.208,11.460]
myMap.addLayer(markerGroup);
const markerOptions = {             // Variabel für alle Marker erstellt
    title: "Universität Innsbruck",
    opacity: 0.6, // transparenz 
    draggable: true // Marker verschieben
}
L.marker(uni, markerOptions).addTo(markerGroup); // Marker hinzugefuegt auf der Uni Innsbruck 
L.marker(usi, markerOptions).addTo(markerGroup);
L.marker(technick, markerOptions).addTo(markerGroup);
L.marker(igls, markerOptions).addTo(markerGroup);

let patscherkofelmarker = L.marker(patscherkofel, markerOptions,).addTo(markerGroup);

patscherkofelmarker.bindPopup("<p>Patscherkofel von der Nordkette aus</p> <img style='width:200px'src='https://apps.tirol.gv.at/luft/nordkette.jpg' alt='Patscherkofel' />");

let lift = L.polyline([igls, patscherkofel],{
    color: 'green'
})
myMap.addLayer(lift);


let uniPolygon = L.polygon([uni,usi,technick]);
myMap.addLayer(uniPolygon);
uniPolygon.bindPopup("Magisches Dreieck!");


myMap.fitBounds(markerGroup.getBounds());
 







/* Objekte erstellen
let myLayers = {
    wert : 100,
    alter : 50,
    farbe : "grün",
    liste : [1,2,3,4],
    nocheinobjekt = {
    }
}
*/
/*
myLayer = L.tileLayer("https://maps.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png")
// let url = "https://maps.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png"

myLayer = L.tileLayer("https://maps.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png")
myLayer = L.tileLayer("https://maps.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png")
myLayer = L.tileLayer("https://maps.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg")
myLayer = L.tileLayer("https://maps.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg")
*/


