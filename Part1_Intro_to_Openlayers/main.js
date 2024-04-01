var carte = new ol.Map({
    target: 'js-map', // L'ID de l'élément HTML où la carte sera rendue
    controls: ol.control.defaults().extend([
        new ol.control.ScaleLine(),
        new ol.control.FullScreen(),
        new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(4), // Or any other format function
            projection: 'EPSG:4326',
            className: 'custom-mouse-position',
            target: undefined, // If you want to place it outside of the map, specify the target element here.
            undefinedHTML: '&nbsp;'
          })
    ]),
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM() // Utilise OpenStreetMap comme source de tuiles
        }),
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/SIG2/wms',
                params: {
                    'LAYERS':'Provinces',
                    'TRANSPARENCE':true,
                    'WIDTH':640,
                    'HEIGHT':480,
                    'TILED': true
                },
              serverType: 'geoserver'
            })
            
        }),
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/SIG2/wms',
                params: {
                    'LAYERS':'Communes',
                    'TRANSPARENCE':true,
                    'WIDTH':640,
                    'HEIGHT':480,
                    'TILED': true
                },
              serverType: 'geoserver'
            })
        }),
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/SIG2/wms',
                params: {
                    'LAYERS':'Regions',
                    'TRANSPARENCE':true,
                    'WIDTH':640,
                    'HEIGHT':480,
                    'TILED': true
                },
              serverType: 'geoserver'
            })
        }),
     

    ],
    view: new ol.View({

        center: ol.proj.transform([-7.63, 33.56],"EPSG:4326","EPSG:3857"), 
        zoom: 5
    })

       /**/
   

});
var wmsSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/SIG2/wms',
    params: {'LAYERS': 'SIG2:Regions', 'TILED': true},
    serverType: 'geoserver'
  });

var legendUrl = wmsSource.getGetLegendGraphicUrl({
    'FORMAT': 'image/png', // This is the default anyway
    'VERSION': '1.3.1', // Version of WMS
    'WIDTH': 20, // Optional: width of the symbol
    'HEIGHT': 20, // Optional: height of the symbol
    'LAYER': 'SIG2:Regions', // Specify your layer
    'LEGEND_OPTIONS': 'forceLabels:on' // Optional: this forces labels in the legend graphic
  });
  document.getElementById('legend').innerHTML = '<img src="' + legendUrl + '" alt="Legend">';
