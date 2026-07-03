import api from "./api";

export const getMyListings = async () => {
  const { data } = await api.get("/listings/my");
  return data;
};

export const createListing = async (listing) => {
  const { data } = await api.post("/listings", listing);
  return data;
};

export const updateListing = async (id, listing) => {
  const { data } = await api.put(`/listings/${id}`, listing);
  return data;
};

export const markListingFilled = async (id) => {
  const { data } = await api.patch(`/listings/${id}/fill`);
  return data;
};

export const getListingById = async (id) => {
  const { data } = await api.get(`/listings/${id}`);
  return data;
};