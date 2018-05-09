let myMap = L.map("mapdiv"); // http://leafletjs.com/reference-1.3.0.html#map-l-map

const wienGroup = L.featureGroup();

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
    //"Wetterstationen" : awsGroup,
    "Stadtspaziergang durch Wien" : wienGroup

});
myMap.addControl(myMapControl); //http://leafletjs.com/reference-1.3.0.html#map-addcontrol
myMap.addLayer(wienGroup);
myMapControl.expand() // Methode um My Controll Feld automatisch auszuklappen

// Einstellungen 11 = Zoomfaktor
myMap.setView([47.267,11.383],11); //http://leafletjs.com/reference-1.3.0.html#map-setview



// Massstab einfuegen
L.control.scale({       // http://leafletjs.com/reference-1.3.0.html#control-scale
    maxWidth: 200,      // http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
    metric: true,       // http://leafletjs.com/reference-1.3.0.html#control-scale-metric
    imperial: false     // http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
}).addTo(myMap);











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

async function addGeojson(url) {
    console.log("Url wird geladen: ",url);
    const response = await fetch(url);
    console.log("Response: ", response);
    const wiendata = await response.json();
    console.log("GeoJson: ", wiendata);
    const geojson =L.geoJSON(wiendata, {

        style: function(feature) {
            return { color: "#ff0000"};
        },
        pointToLayer: function(geoJsonPoint, latlng) {
            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl:"icon_wien.png"
                })

            });
        }

        
    });
    wienGroup.addLayer(geojson);
    myMap.fitBounds(wienGroup.getBounds());
    const hash = new L.Hash(myMap)
}

const url = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&srsName=EPSG:4326&outputFormat=json&typeName=ogdwien:SPAZIERPUNKTOGD,ogdwien:SPAZIERLINIEOGD"

addGeojson(url);



myMap.addLayer(wienGroup);

var markers = L.markerClusterGroup(wienGroup);
markers.addLayer(L.marker(getRandomLatLng(myMap)));