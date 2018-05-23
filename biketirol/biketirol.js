/*
    Vorbereitung: GPX Track herunterladen und nach GeoJSON konvertieren
    -------------------------------------------------------------------
    Datenquelle https://www.data.gv.at/suche/?search-term=bike+trail+tirol&searchIn=catalog
    Download Einzeletappen / Zur Ressource ...
    Alle Dateien im unterverzeichnis data/ ablegen
    Die .gpx Datei der eigenen Etappe als etappe00.gpx speichern
    Die .gpx Datei über https://mapbox.github.io/togeojson/ in .geojson umwandeln und als etappe00.geojson speichern
    Die etappe00.geojson Datei in ein Javascript Objekt umwandeln und als etappe00.geojson.js speichern
    -> statt 00 natürlich die eigene Etappe (z.B. 01,02, ...25)
*/

// eine neue Leaflet Karte definieren

let myMap = L.map("map");    // http://leafletjs.com/reference-1.3.0.html#map-l-map
const awsGroup = L.featureGroup();

let markerGroup = L.featureGroup();

let overlaySteigung = L.featureGroup().addTo(myMap);

let myLayers = {
    osm: L.tileLayer(  // http://leafletjs.com/reference-1.3.0.html#tilelayer-l-tilelayer
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            subdomains: ["a", "b", "c"],
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    ),


    geolandbasemap: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],                          // http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"    // http://leafletjs.com/reference-1.3.0.html#tilelayer-attribution
        }
    ),



    elektronische_karte_sommer: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_base_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80"
        , {

            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),

    elektronische_karte_winter: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_base_winter/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80"
        , {

            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),

    elektronische_karte_ortho: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80"
        , {

            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    /*
    bmapgrau : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmaphidpi : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmaporthofoto30cm : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),*/
};
myMap.addLayer(myLayers.geolandbasemap);    // http://leafletjs.com/reference-1.3.0.html#map-addlayer


let myMapControl = L.control.layers({       // http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "Openstreetmap": myLayers.osm,
    "basemap.at Grundkarte": myLayers.geolandbasemap,
    "Sommerkarte": myLayers.elektronische_karte_sommer,
    "Winterkarte": myLayers.elektronische_karte_winter,
    "Ortho-karte": myLayers.elektronische_karte_ortho,

    /*
    "basemap.at grau" : myLayers.bmapgrau,
    "basemap.at highdpi" : myLayers.bmaphidpi,
    "basemap.at Orthofoto" : myLayers.bmaporthofoto30cm,*/

}, {
        //"basemap.at Overlay" : myLayers.bmapoverlay,
        //"wegpunkte": awsGroup,
        "Steigungslinie" : overlaySteigung, 
        
    });

myMap.addLayer(markerGroup)
const start = [47.201713, 10.899444];
const ende = [47.225324, 10.749615];

let endeMarker = L.marker(ende,
    {
        icon: L.icon({
            iconUrl: 'images/ende.png',
            iconAnchor: [16, 37]
        })
    }).addTo(markerGroup);
endeMarker.bindPopup("<h3>Imst</h3><a href = 'https://de.wikipedia.org/wiki/Imst'> Information Imst </a>").openPopup;

let startMarker = L.marker(start,
    {
        icon: L.icon({
            iconUrl: 'images/start.png',
            iconAnchor: [16, 37]
        })
    }).addTo(markerGroup);
startMarker.bindPopup("<h3>Oetz</h3> <a href = 'https://de.wikipedia.org/wiki/Oetz'> Information Oetz </a>").openPopup;



myMap.addControl(myMapControl);     // http://leafletjs.com/reference-1.3.0.html#map-addcontrol

myMap.setView([47.267, 11.383], 11); // http://leafletjs.com/reference-1.3.0.html#map-setview

myMapControl.expand();      // http://leafletjs.com/reference-1.3.0.html#control-layers-expand

L.control.scale({           // http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale
    maxWidth: 200,         // http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
    metric: true,          // http://leafletjs.com/reference-1.3.0.html#control-scale-metric
    imperial: false,       // http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
    position: "bottomleft" // http://leafletjs.com/reference-1.3.0.html#control-scale-position

}).addTo(myMap);            // http://leafletjs.com/reference-1.3.0.html#control-scale-addto


//Wegpunkte deaktiviert weil wir es direkt als gpx Datei anwählen 

// console.log("stationen: ", stationen);

//myMap.addLayer(awsGroup);
/*
let geojson = L.geoJSON(stationen).addTo(awsGroup);
geojson.bindPopup(function (layer) {
    const props = layer.feature.properties;
    const popupText = `<h1>${props.name}</h1>
    <p>Temperatur: ${props.LT} °C</p>`;
    return popupText;
});
myMap.fitBounds(awsGroup.getBounds()); */

// Grundkartenlayer mit OSM, basemap.at, Elektronische Karte Tirol (Sommer, Winter, Orthophoto jeweils mit Beschriftung) über L.featureGroup([]) definieren
// WMTS URLs siehe https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol

// Maßstab metrisch ohne inch +

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/

// GeoJSON Track als Linie in der Karte einzeichnen und auf Ausschnitt zoomen
// Einbauen nicht über async, sondern über ein L.geoJSON() mit einem Javascript Objekt (wie beim ersten Stadtspaziergang Wien Beispiel)

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen

// Overlay controls zum unabhängigem Ein-/Ausschalten der Route und Marker hinzufügen


let gpxTrack = new L.GPX("data/etappe26.gpx", {
    async : true, 
})//.addTo(awsGroup);
gpxTrack.on("loaded", function(evt) {
    console.log("get_distance",evt.target.get_distance().toFixed(0))
    console.log("get_elevation_max",evt.target.get_elevation_max().toFixed(0)) 
    console.log("get_elevation_min",evt.target.get_elevation_min().toFixed(0))
    console.log("get_elevation_gain",evt.target.get_elevation_gain().toFixed(0))
    console.log("get_elevation_loss",evt.target.get_elevation_loss().toFixed(0))

let laenge =evt.target.get_distance().toFixed(0);
document.getElementById("get_distance").innerHTML = laenge;


let tief= evt.target.get_elevation_min().toFixed(0)
let hoch= evt.target.get_elevation_max().toFixed(0)
let aufstieg= evt.target.get_elevation_gain().toFixed(0)
let abstieg= evt.target.get_elevation_loss().toFixed(0)

document.getElementById("tief").innerHTML = tief
document.getElementById("hoch").innerHTML = hoch
document.getElementById("aufstieg").innerHTML = aufstieg
document.getElementById("abstieg").innerHTML = abstieg


    
    myMap.fitBounds(evt.target.getBounds());
});

myMap.addControl(new L.Control.Fullscreen(myMap));   //fullscreen

var hoehenprofil = L.control.elevation();
hoehenprofil.addTo(myMap);
var g=new L.GPX("data/etappe26.gpx", {async: true});
//g.on("addline",function(e){
//	hoehenprofil.addData(e.line);
//});
g.addTo(myMap);


gpxTrack.on('addline', function(evt){
hoehenprofil.addData(evt.line);
  console.log(evt.line);
  console.log(evt.line.getLatLngs());
  console.log(evt.line.getLatLngs()[0]);
  console.log(evt.line.getLatLngs()[0]);
  console.log(evt.line.getLatLngs()[0].lat);
  console.log(evt.line.getLatLngs()[0].lng);
  console.log(evt.line.getLatLngs()[0].meta);
  console.log(evt.line.getLatLngs()[0].meta.ele);

  //alle Segmente der Steigungnslinie hinzufügen

  let gpxLinie = evt.line.getLatLngs();
    for (let i = 1; i < gpxLinie.length; i++) {
        let p1 = gpxLinie[i-1];
        let p2 =gpxLinie[i];
        

//Entfernung zwischen den Punkten berechnen
        let dist= myMap.distance(
            [p1.lat,p1.lng],
            [p2.lat,p2.lng]
        );
      

//hoehenunterschied
        let delta = p2.meta.ele - p1.meta.ele;
        

        //Steigung in %
       
        let proz = (dist  > 0 ) ? (delta / dist * 100.0).toFixed(1) : 0;

        console.log(p1.lat,p1.lng,p2.lat,p2.lng,dist,delta,proz);

// Farben: http://colorbrewer2.org/#type=sequential&scheme=Greens&n=4
        let farbe = 
          proz > 10  ? "#cb181d" : 
          proz > 6   ? "fb6a4a" : 
          proz > 2   ? "#fcae91" : 
          proz > 0   ? "#fee5d9" : 
          proz > -2  ? "#edf8e9" : 
          proz > -6  ? "#bae4b3" : 
          proz > -10 ? "#74c476" :  
                        "#238b45"; 
        
          let segment = L.polyline(
            [
            [p1.lat,p1.lng],
            [p2.lat,p2.lng],
            ], {
                    color: farbe,
                    weight : 10, 
            }
        ).addTo(overlaySteigung)
    }

});








