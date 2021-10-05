import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import { AffectedArea } from '../pages/api/affected';

type MapFragmentProps = {
  data?: d3.ExtendedFeatureCollection<
    d3.ExtendedFeature<d3.GeoGeometryObjects | null, any>
  >;
  setSelectedProvince: React.Dispatch<
    React.SetStateAction<AffectedArea | undefined>
  >;
};

const MapFragment = ({
  data,
  setSelectedProvince,
}: MapFragmentProps): JSX.Element => {
  const [g, setG] =
    useState<d3.Selection<d3.BaseType, unknown, HTMLElement, any>>();
  const [svgNode, setSvgNode] = useState<Element>();
  const [subscribe, setSubscribe] = useState<boolean>(false);

  useEffect(() => {
    const svg = d3.select('#floodMap');
    setG(svg.select('g'));
    setSvgNode(svg.node() as Element);
  }, []);

  useEffect(() => {
    if (!g || !svgNode || !data || subscribe) return;

    const renderMap = () => {
      if (!g || !svgNode || !data) return;

      const width = svgNode.getBoundingClientRect().width;
      const height = svgNode.getBoundingClientRect().height;

      const projection = d3
        .geoMercator()
        .rotate([-180, 0])
        .fitSize([width, height], data);
      const path = d3.geoPath().projection(projection);

      g.selectChildren().remove();

      g.selectAll('path')
        .data(data.features)
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
          if (!g || !svgNode) return;

          setSelectedProvince((prevState) => {
            let newSelected: AffectedArea | undefined;

            let x, y, k;

            if (
              !prevState ||
              (d &&
                d.properties.detail &&
                prevState.nameEng !== d.properties.detail.nameEng)
            ) {
              const centroid = path.centroid(d);
              x = centroid[0];
              y = centroid[1];
              k = 4;
              newSelected = d.properties.detail;
            } else {
              x = width / 2;
              y = height / 2;
              k = 1;
              newSelected = undefined;
            }

            g.selectAll('path').style('fill', (val: any) => {
              return val && newSelected === val
                ? '#D5708B'
                : val.properties.color;
            });

            // Zoom
            g.transition()
              .duration(750)
              .attr(
                'transform',
                'translate(' +
                  width / 2 +
                  ',' +
                  height / 2 +
                  ')scale(' +
                  k +
                  ')translate(' +
                  -x +
                  ',' +
                  -y +
                  ')'
              );

            return newSelected;
          });
        });
      // credit to http://bl.ocks.org/adkdev/fe15a54ad3748c72e059475e3f43d462
    };

    renderMap();
    window.addEventListener('resize', () => renderMap());
    setSubscribe(true);
  }, [g, data, svgNode, subscribe, setSelectedProvince]);

  return (
    <svg id="floodMap" width="100%" height="100%">
      <g></g>
    </svg>
  );
};

export default MapFragment;
