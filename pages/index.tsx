import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { NoSsr } from '@mui/core';
import React, { useEffect } from 'react';
import Map from '../element/map';
import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { OverviewResponse, getOverview } from './api/affected';

type HomeProps = {
  data?: OverviewResponse;
};

const Home = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  useEffect(() => {
    console.info(data);
  }, [data]);

  return (
    <>
      <Box height="100vh">
        <NoSsr>
          <Map />
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
