import api from "./api";

export const generateCompatibility = async (listingId) => {
  const { data } = await api.post(`/compatibility/${listingId}`);
  return data;
};