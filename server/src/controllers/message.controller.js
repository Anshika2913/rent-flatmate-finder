import {
  getMessages,
  sendMessage,
  getOwnerConversations,
  getTenantConversations,
} from "../services/message.service.js";

export const getConversationMessages = async (req, res) => {
  try {
    const messages = await getMessages(req.params.id);

    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createMessage = async (req, res) => {
  try {
    const message = await sendMessage(
      req.params.id,
      req.user.id,
      req.body.content
    );

    res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const ownerConversations = async (req, res) => {
  try {
    const conversations = await getOwnerConversations(req.user.id);

    res.json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const tenantConversations = async (req, res) => {
  try {
    const conversations = await getTenantConversations(req.user.id);

    res.json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};