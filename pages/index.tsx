import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { NoSsr } from '@mui/core';
import React, { useEffect, useState } from 'react';
import MapFragment from '../element/map';
import { Box } from '@mui/system';
import { getOverview, OverviewResponse } from './api/affected';
import * as d3 from 'd3';

type HomeProps = {
  data?: OverviewResponse;
};

const Home = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const [mapData, setMapData] =
    useState<
      d3.ExtendedFeatureCollection<
        d3.ExtendedFeature<d3.GeoGeometryObjects | null, any>
      >
    >();

  useEffect(() => {
    if (!data) return;

    d3.json<
      d3.ExtendedFeatureCollection<
        d3.ExtendedFeature<d3.GeoGeometryObjects | null, any>
      >
    >(
      'https://raw.githubusercontent.com/apisit/thailand.json/master/thailandwithdensity.json'
    ).then((e) => {
      if (!e) return;

      const parsedData: Map<string, number> = new Map();
      for (const affectedArea of data.affectedAreas) {
        parsedData.set(affectedArea.name, affectedArea.affected);
      }

      for (let i = 0; i < e.features.length; i++) {
        console.info(
          e.features[i].properties.name,
          parsedData.has(e.features[i].properties.name)
        );
        if (parsedData.has(e.features[i].properties.name)) {
          e.features[i].properties.score = parsedData.get(
            e.features[i].properties.name
          );
        } else {
          e.features[i].properties.score = 0;
        }

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

      setMapData(e);
    });
  }, [data]);

  return (
    <>
      <Box height="100vh">
        <NoSsr>
          <MapFragment data={mapData} />
        </NoSsr>
      </Box>
      <Box position="fixed" top={0} left="1rem" fontSize={45} fontWeight="bold">
        ขอนแก่น
      </Box>
      <Box
        position="fixed"
        top={57}
        left="1rem"
        fontSize={20}
        fontWeight="light"
      >
        พื้นที่น้ำท่วมทั้งหมด 0 ไร่
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const data = getOverview();

  return {
    props: {
      data,
    },
  };
};

export default Home;
