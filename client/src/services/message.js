import api from "./api";

export const getOwnerChats = async () => {
  const { data } = await api.get("/messages/owner");
  return data;
};

export const getTenantChats = async () => {
  const { data } = await api.get("/messages/tenant");
  return data;
};

export const getMessages = async (conversationId) => {
  const { data } = await api.get(`/messages/${conversationId}`);
  return data;
};

export const sendMessage = async (conversationId, content) => {
  const { data } = await api.post(`/messages/${conversationId}`, {
    content,
  });

  return data;
};