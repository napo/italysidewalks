# italysidewalks
tutte le larghezze dei marciapiedi d'Italia rilasciati in opendata

# scripts
tippecanoe --force -e sidewalks  --no-tile-compression  output.geojson
ogr2ogr -f 'GeoJSON' -update -append output.geojson output3.geojson -nln output
