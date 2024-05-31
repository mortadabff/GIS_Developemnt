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
              serverType: 'geoserver',
              name: 'Provinces'
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
              serverType: 'geoserver',
              name: 'Communes'
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
              serverType: 'geoserver',
              name: 'Regions'
            })
        }),
     

    ],
    view: new ol.View({

        center: ol.proj.transform([-7.63, 33.56],"EPSG:4326","EPSG:3857"), 
        zoom: 5
    })
       /**/
   
 
 
});
// Utiliser la fonction pour obtenir les URL des légendes et les insérer dans la page
document.getElementById('legendProvinces').innerHTML = '<img src="' + getLegendUrl('Provinces') + '" alt="Légende des Provinces">';
document.getElementById('legendCommunes').innerHTML = '<img src="' + getLegendUrl('Communes') + '" alt="Légende des Communes">';
document.getElementById('legendRegions').innerHTML = '<img src="' + getLegendUrl('Regions') + '"alt="Légende des Communes">';

// Fonction pour obtenir l'URL de la légende pour une couche spécifique
function getLegendUrl(layerName) {
    var wmsSource = new ol.source.TileWMS({
      url: 'http://localhost:8080/geoserver/SIG2/wms',
      params: {'LAYERS': 'SIG2:' + layerName, 'TILED': true, 'TRANSPARENT': 'TRUE', },
      serverType: 'geoserver'
    });
  
    return wmsSource.getLegendUrl({
      'FORMAT': 'image/png',
      'VERSION': '1.1.0', // ou '1.3.0' en fonction de ce que supporte votre serveur
      'WIDTH': 20,
      'HEIGHT': 20,
      'LAYER': 'SIG2:' + layerName,
      'LEGEND_OPTIONS': 'forceLabels:on'
    });
  }
  
 

  //
 /* function toggleLayer(layerName) {
    carte.getLayers().forEach(function(layer) {
        if (layer.get('name') === layerName) {
            // Change la visibilité de la couche
            var visibility = layer.getVisible();
            layer.setVisible(!visibility);
        } else {
            // Vous pourriez choisir de masquer les autres couches ici si nécessaire
            layer.setVisible(false);
        }
    });
}
document.getElementById('viewProvinceButton').onclick = function() {
    toggleLayer('Provinces');
};

document.getElementById('viewCommuneButton').onclick = function() {
    toggleLayer('Communes');
};

*/