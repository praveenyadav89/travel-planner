import { countriesApi } from "./axiosInstance";
import { CountryData } from "../types";

export const fetchCountry = async (code: string): Promise<CountryData> => {
  const { data } = await countriesApi.get(`/alpha/${code}`);
  const c = data[0];
  const currKey = Object.keys(c.currencies || {})[0];
  return {
    name: c.name.common,
    capital: c.capital?.[0] || "N/A",
    population: c.population,
    area: c.area,
    currency: currKey ? c.currencies[currKey].name : "Unknown",
    languages: Object.values(c.languages || {}) as string[],
    flag: c.flags?.svg || c.flags?.png || "",
    region: c.region,
    timezone: c.timezones?.[0] || "UTC",
  };
};
