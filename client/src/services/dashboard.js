import api from "./api";

export const getOwnerDashboardData = async () => {
  const [listings, interests, conversations] = await Promise.all([
    api.get("/listings"),
    api.get("/interests/received"),
    api.get("/conversations"),
  ]);

  return {
    totalListings: listings.data.count,
    totalInterests: interests.data.count,
    totalConversations: conversations.data.count,
  };
};