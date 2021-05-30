import axios, { AxiosRequestConfig } from 'axios';

import { API_BrowseDates, BrowseDateRequestObject } from 'types';

export const getBrowseDatesFromApi = async (data: BrowseDateRequestObject): Promise<API_BrowseDates> => {
  let options: AxiosRequestConfig = {
    method: 'GET',
    url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/${data.country}/${data.currency}/${data.locale}/${data.originplace}/${data.destinationplace}/${data.outboundpartialdate}`,
    // params: {inboundpartialdate: '2019-12-01'},
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
      'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
    },
  };

  if (data.inboundpartialdate) {
    options = {
      ...options,
      params: { inboundpartialdate: data.inboundpartialdate },
    };
  }

  try {
    const response = await axios.request(options);

    const result = (await response.data) as API_BrowseDates;

    console.log('result is ', result);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};
