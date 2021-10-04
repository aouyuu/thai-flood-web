import * as d3 from 'd3';
import { useEffect, useState } from 'react';

type MapProps = {};

const Map = ({}: MapProps): JSX.Element => {
  const [g, setG] =
    useState<d3.Selection<d3.BaseType, unknown, HTMLElement, any>>();
  const [svgNode, setSvgNode] = useState<Element>();
  const [topology, setTopology] =
    useState<
      d3.ExtendedFeatureCollection<
        d3.ExtendedFeature<d3.GeoGeometryObjects | null, any>
      >
    >();
  const [subscribe, setSubscribe] = useState<boolean>(false);

  useEffect(() => {
    const svg = d3.select('#floodMap');
    setG(svg.select('g'));
    setSvgNode(svg.node()! as Element);

    d3.json<
      d3.ExtendedFeatureCollection<
        d3.ExtendedFeature<d3.GeoGeometryObjects | null, any>
      >
    >(
      'https://raw.githubusercontent.com/apisit/thailand.json/master/thailandwithdensity.json'
    ).then((e) => {
      if (!e) return;

      for (let i = 0; i < e.features.length; i++) {
        e.features[i].properties.score = Math.floor(Math.random() * 255);

        if (e.features[i].properties.score >= 200) {
          e.features[i].properties.color = '#44667D';
        } else if (e.features[i].properties.score >= 150) {
          e.features[i].properties.color = '#5986A5';
        } else if (e.features[i].properties.score >= 100) {
          e.features[i].properties.color = '#7BA1B8';
        } else if (e.features[i].properties.score >= 50) {
          e.features[i].properties.color = '#C3D7E0';
        } else {
          e.features[i].properties.color = '#D6E4EA';
        }
      }

      setTopology(e);
    });
  }, []);

  useEffect(() => {
    if (!g || !svgNode || !topology || subscribe) return;

    renderMap();
    window.addEventListener('resize', () => renderMap());
    setSubscribe(true);
  }, [g, topology]);

  const renderMap = () => {
    if (!g || !svgNode || !topology) return;

    const width = svgNode.getBoundingClientRect().width;
    const height = svgNode.getBoundingClientRect().height;

    const projection = d3
      .geoMercator()
      .rotate([-180, 0])
      .fitSize([width, height], topology);
    const path = d3.geoPath().projection(projection);

    g.selectChildren().remove();

    g.selectAll('path')
      .data(topology.features)
      .enter()
      .append('path')
      .attr('d', path)
      .style('fill', (val) => val.properties.color)
      .style('cursor', 'pointer')
      .on('mouseover', (e) => {
        d3.select(e.currentTarget).style('fill', `rgb(200,200,200)`);
      })
      .on('mouseout', (e) => {
        d3.select(e.currentTarget).style(
          'fill',
          (val: any) => val.properties.color
        );
      })
      .on('click', (_, d) => {
        console.info(d.properties.name);
      });
  };

  return (
    <svg id="floodMap" width="100%" height="100%">
      <g></g>
    </svg>
  );
};

export default Map;
