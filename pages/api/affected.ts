export type OverviewResponse = {
  updateTimestamp: number;
  date: number;
  affectedAreas: {
    id: number;
    name: string;
    affected: number;
  }[];
};

export type DetailByProvinceResponse = {
  updateTimestamp: number;
  date: number;
  id: number;
  name: string;
  district: {
    id: number;
    updateTimestamp: number;
    name: string;
    subdistrict: {
      id: number;
      updateTimestamp: number;
      name: string;
      affected: number;
    }[];
  }[];
};

export const getOverview = (): OverviewResponse => {
  return {
    updateTimestamp: 1633371269,
    date: 1633284000,
    affectedAreas: [
      {
        id: 1,
        name: 'Bangkok',
        affected: 50,
      },
      {
        id: 2,
        name: 'KhonKaen',
        affected: 100,
      },
    ],
  };
};

export const getDetailByProvince = (): DetailByProvinceResponse => {
  return {
    updateTimestamp: 1633371269,
    date: 1633371269,
    id: 2,
    name: 'KhonKaen',
    district: [
      {
        id: 1,
        updateTimestamp: 1633371269,
        name: 'เมืองขอนแก่น',
        subdistrict: [
          {
            id: 1,
            updateTimestamp: 1633371269,
            name: 'ในเมือง',
            affected: 100,
          },
          {
            id: 2,
            updateTimestamp: 1633371269,
            name: 'เมืองเก่า',
            affected: 50,
          },
          {
            id: 3,
            updateTimestamp: 1633371269,
            name: 'พระยืน',
            affected: 0,
          },
        ],
      },
    ],
  };
};
