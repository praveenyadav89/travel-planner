import { fourSquareApi } from "./axiosInstance";
import { Place, PlacesResponse } from "../types";

export const fetchPlaces = async (
  lat: string,
  lon: string,
): Promise<PlacesResponse> => {
  if (!lat || !lon) return { places: [] };

  const { data } = await fourSquareApi.get("/fsq/places/search", {
    params: {
      ll: `${lat},${lon}`,
      limit: 12,
      sort: "RELEVANCE",
    },
  });

  const places: Place[] = data.results.map((item: any): Place => {
    const categoryName = item.categories?.[0]?.name || "Attraction";

    const photo = item.photos?.[0];
    const photoUrl = photo
      ? `${photo.prefix}400x300${photo.suffix}`
      : undefined;

    const hoursDisplay =
      item.hours?.display ||
      (item.hours?.open_now === true ? "Open now" : undefined) ||
      (item.hours?.open_now === false ? "Closed now" : undefined);

    return {
      id: item.fsq_id,
      name: item.name,
      address:
        item.location?.formatted_address ||
        item.location?.address ||
        "Address not available",
      category: categoryName,

      latitude: item.geocodes?.main?.latitude ?? parseFloat(lat),
      longitude: item.geocodes?.main?.longitude ?? parseFloat(lon),
      distance: item.distance,
      rating: item.rating ? parseFloat(item.rating.toFixed(1)) : undefined,
      price: item.price,
      hours: hoursDisplay,
      phone: item.tel,
      website: item.website,
      photos: photoUrl ? [photoUrl] : [],
      tips: item.tips?.[0]?.text,
    };
  });

  return { places };
};
