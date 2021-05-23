import allCities from 'data/cities.json';

export type City = {
  name: string;
  country: string;
};

export const cities: City[] = allCities.map((c: any) => {
  return { name: c.name, country: c.country };
});
