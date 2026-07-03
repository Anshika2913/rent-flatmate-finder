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