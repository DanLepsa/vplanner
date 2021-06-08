import axios, { AxiosRequestConfig } from 'axios';

import { API_BrowseDates, BrowseDateRequestObject } from 'types';

export const getBrowseDatesFromApi = async (data: BrowseDateRequestObject): Promise<API_BrowseDates> => {
  let url = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/${data.country}/${data.currency}/${data.locale}/${data.originplace}/${data.destinationplace}/${data.outboundpartialdate}`;

  if (data.inboundpartialdate) {
    url += `/${data.inboundpartialdate}`;
  }

  const options: AxiosRequestConfig = {
    method: 'GET',
    url: url,
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
      'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);

    const result = (await response.data) as API_BrowseDates;

    return result;
  } catch (error) {
    throw new Error(error);
  }
};
