import api from "./api";

export const getReceivedInterests = async () => {
  const { data } = await api.get("/interests/received");
  return data;
};

export const acceptInterest = async (id) => {
  const { data } = await api.patch(`/interests/${id}/accept`);
  return data;
};

export const declineInterest = async (id) => {
  const { data } = await api.patch(`/interests/${id}/decline`);
  return data;
};

export const sendInterest = async (listingId) => {
  const { data } = await api.post(`/interests/${listingId}`);
  return data;
};

export const getSentInterests = async () => {
  const { data } = await api.get("/interests/sent");
  return data;
};