import { geoDBApi } from "./axiosInstance";
import { City } from "../types";

export const fetchCities = async (query: string): Promise<City[]> => {
  if (!query || query.length < 2) return [];

  try {
    const { data } = await geoDBApi.get("/cities", {
      params: {
        namePrefix: query,
        limit: 8,
        sort: "-population",
      },
    });

    return data.data.map((c: any) => ({
      id: c.id,
      city: c.city,
      country: c.country,
      countryCode: c.countryCode,
      latitude: c.latitude,
      longitude: c.longitude,
    }));
  } catch (error: any) {
    if (error.response?.status === 429) {
      console.error("Too many requests (Rate limit exceeded)");
    }

    console.error("City API error:", error.message);
    return [];
  }
};

export const fetchCityCount = async (): Promise<number> => {
  try {
    const { data } = await geoDBApi.get("/cities", {
      params: { limit: 1 },
    });

    return data.metadata.totalCount;
  } catch (error) {
    console.error("Failed to fetch city count", error);
    return 0;
  }
};
