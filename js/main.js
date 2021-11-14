var map = L.map("map",{ minZoom: 7 });

$.getJSON("./static/pokhara.geojson").then(function(geoJSON) {
  var osm = new L.TileLayer.BoundaryCanvas("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    boundary: geoJSON,
    attribution: '&copy;'
  });
  map.addLayer(osm);
  var nepal = L.geoJSON(geoJSON);
  var bounds = nepal.getBounds();
  map.fitBounds(bounds);
  map.setMaxBounds(bounds);
  map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
  });
});

$.getJSON("./static/data.json").then(function(data){
    data.forEach(element => {
    L.marker([element["coordinate"]["lat"], element["coordinate"]["lng"]]).addTo(map)
    .bindPopup(`<h3>PM 2.5: ${element["pm2.5"]}</h3><h3>NO2: ${element["no2"]}</h3>`)
    .openPopup();
    });
})