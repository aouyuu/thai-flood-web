export type OverviewResponse = {
  updateTimestamp: number;
  date: number;
  affectedAreas: {
    id: number;
    nameEng: string;
    nameThai: string;
    affected: number;
  }[];
};

export type DetailByProvinceResponse = {
  updateTimestamp: number;
  date: number;
  id: number;
  nameEng: string;
  nameThai: string;
  district: {
    id: number;
    updateTimestamp: number;
    nameEng: string;
    nameThai: string;
    subdistrict: {
      id: number;
      updateTimestamp: number;
      nameEng: string;
      nameThai: string;
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
        nameEng: 'Bangkok',
        nameThai: 'กรุงเทพ',
        affected: 50,
      },
      {
        id: 2,
        nameEng: 'KhonKaen',
        nameThai: 'ขอนแก่น',
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
    nameEng: 'KhonKaen',
    nameThai: 'ขอนแก่น',
    district: [
      {
        id: 1,
        updateTimestamp: 1633371269,
        nameEng: 'Muang KhonKaen',
        nameThai: 'เมืองขอนแก่น',
        subdistrict: [
          {
            id: 1,
            updateTimestamp: 1633371269,
            nameEng: 'Nai Muang',
            nameThai: 'ในเมือง',
            affected: 100,
          },
          {
            id: 2,
            updateTimestamp: 1633371269,
            nameEng: 'เมืองเก่า',
            nameThai: 'เมืองเก่า',
            affected: 50,
          },
          {
            id: 3,
            updateTimestamp: 1633371269,
            nameEng: 'พระยืน',
            nameThai: 'พระยืน',
            affected: 0,
          },
        ],
      },
    ],
  };
};
