import axios, { AxiosRequestConfig } from 'axios';

import { City, Airport, API_Airport } from 'types';

export const getAirportsFromApi = async (location: City): Promise<Airport[]> => {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/',
    params: { query: location.name },
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
      'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);

    const places = (await response.data.Places) as API_Airport[];

    const result: Airport[] = places.map((place) => ({
      id: place.PlaceId,
      name: place.PlaceName,
      countryId: place.CountryId,
      countryName: place.CountryName,
      cityId: place.CityId,
      regionId: place.RegionId,
    }));

    return result;
  } catch (error) {
    console.log('error ', error);
    throw 'error';
  }
};
