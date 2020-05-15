# italysidewalks
tutte le larghezze dei marciapiedi d'Italia rilasciati in opendata

# scripts
ogr2ogr -f 'GeoJSON' -update -append output.geojson output3.geojson -nln output
tippecanoe -z0 -z18 --force -e sidewalks  --no-tile-compression  output.geojson
