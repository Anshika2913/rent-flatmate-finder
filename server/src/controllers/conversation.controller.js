import { getUserConversations } from "../services/conversation.service.js";

export const getAll = async (req, res) => {
  try {
    const conversations = await getUserConversations(req.user.id);

    return res.status(200).json({
      success: true,
      count: conversations.length,
      data: conversations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};