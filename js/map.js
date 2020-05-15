var vectorTileStyling = {
    output: function(properties, zoom) {
    	var w = properties.width;
    	rstyle = {
 	    	color: '#e31a1c',
            weight: 1,
            fillOpacity: 1,
            fill: true   	
    	}
    	if (w <= 2) {
			rstyle = {
	 	    	color: '#e31a1c',
		        weight: 1,
		        fillOpacity: 1,
		        fill: true   	
			}
        } else if ((w > 2) && (w <=4)) {
			rstyle = {
	 	    	color: '#ff7f00',
		        weight: 1,
		        fillOpacity: 1,
		        fill: true   	
			}        
        } else if ((w >= 4) && (w < 6)) {
 			rstyle = {
	 	    	color: '#d6e52e',
		        weight: 1,
		        fillOpacity: 1,
		        fill: true   	
			}
        } else if ((w >= 6) && (w < 8)) {
 			rstyle = {
	 	    	color: '#b2df8a',
		        weight: 1,
		        fillOpacity: 1,
		        fill: true   	
			}
        } else {
 			rstyle = {
	 	    	color: '#118bf7',
		        weight: 1,
		        fillOpacity: 1,
		        fill: true   	
			}
        }
        return(rstyle);
	}
}

var map = L.map('map',
	{ 
		zoomControl: false,
		dragging: true,
		maxZoom: 18,
		minZoom: 9 
	});


var cartodbAttribution = 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. Data by <a href="http://www.openstreetmap.org/">OpenStreetMap</a>, under ODbL.';

var positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
		attribution: cartodbAttribution,
		//opacity: 1
}).addTo(map);

var sidewalksUrl = "sidewalks/{z}/{x}/{y}.pbf";
var sidewalksOps = {
	rendererFactory: L.canvas.tile,
	attribution: 'data elaborated from <a href="https://geodati.gov.it/geoportalRNDTPA/catalog/search/resource/details.page?uuid=r_basili%3A26e21af8%3A14ff44204d8%3A18ea">Regione Basilicata</a> under IODL 2.0',
	vectorTileLayerStyles: vectorTileStyling,
	interactive: true
	};
	
var sidewalksLayer = L.vectorGrid.protobuf(sidewalksUrl, sidewalksOps).addTo(map);

var popup = new L.popup({
      closeButton: false,
      closeOnClick: false
});

function addPopup(e) {
	var lineWidth = -1;
	if (e.layer.feature) {
		var prop = e.layer.feature.properties;
		lineWidth = prop.width;
	} else {
		var prop = e.layer.properties;
		lineWidth = prop.width;
	}
    var lineColor = '#0875f9'; 
    var coordinates = e.lngLat;

    if (lineWidth < 2) {
    	var message = 'Questo tratto è troppo stretto per il distanziamento sociale'
        var lineColor = '#ed4347'  //sys red
    } else if (lineWidth >= 2 && lineWidth < 4) {
        var message = 'Questo tratto è troppo stretto per il distanziamento sociale'
        var lineColor = '#ed4347' //sys red	
	} else if (lineWidth >= 4 && lineWidth < 6) {
        var message = 'Il distanziamento sociale in questo tratto è difficile.'
        var lineColor = '#ff9848' //yellow
    } else if (lineWidth >= 6 && lineWidth < 8) {
        var message = 'Il distanziamento sociale è possibile in questo tratto.'
        var lineColor = '#41ce69' //green
	} else {
        var message = 'Il distanziamento sociale dovrebbe essere possibile in questo tratto.'
        var lineColor = '#0875f9'  //blue
      }
	
	  w = (Math.round(lineWidth * 10) / 10).toString().replace(".", ",");   
     	 var description = 
        '<div class="name1">Larghezza</div>' +
        '<div class="width">' + w + 'm</div>' +
         '<hr style="border: 2px solid ' + lineColor + ' ;"/>' +
        '<div class="message">' + message + '</div>'

	popup.setLatLng(e.latlng)
      	popup.setContent(description)
      	popup.addTo(map)
 }

sidewalksLayer.on('mouseover', function(e) {
	addPopup(e);
});


var hash = new L.Hash(map);

var redStyle = {
  "color": "c4c4c4",
  "weight": 4,
  "fillOpacity": 0
};
/*
var border = L.geoJson(basilicata, { style: redStyle}).addTo(map)
map.fitBounds(border.getBounds());
map.setMaxBounds(border.getBounds());
var overlayMaps = {
        "basilicata": border,
  };    
*/
italy  = [41.458,12.706]
map.setView(italy, 8);
new L.Control.Zoom({ position: 'topright' }).addTo(map);
