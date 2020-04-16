import { json } from 'd3-fetch';
import { select } from 'd3-selection';
import { geoKavrayskiy7 } from 'd3-geo-projection';
import { geoPath, geoGraticule } from 'd3-geo';
import { feature } from 'topojson';

(async function() {
  const width = 1000;
  const height = 540;

  const svg = select('svg#map')
    .attr('viewBox', `0 0 ${width} ${height}`);

  const projection = geoKavrayskiy7()
    .scale(170)
    .translate([ width / 2, height / 2])
    .precision(0.1);

  const graticule = geoGraticule();

  const path = geoPath()
    .projection(projection);


  svg.append('defs').append('path')
    .datum({type: 'Sphere'})
    .attr('id', 'sphere')
    .attr('d', path);
    
  svg.append('use')
    .attr('class', 'background-fill')
    .attr('xlink:href', '#sphere');
    
  svg.append('path')
    .datum(graticule)
    .attr('class', 'graticule')
    .attr('d', path);
    
  const world = await json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json');
    
  const countries = feature(world, world.objects.countries).features;
    
  svg.selectAll('path.country')
    .data(countries)
    .enter()
    .insert('path')
    .attr('class', 'country')
    .attr('d', path)
    .append('title')
    .text(d => d.properties.name);

  svg.append('use')
    .attr('class', 'background-stroke')
    .attr('xlink:href', '#sphere');
    
})();
  