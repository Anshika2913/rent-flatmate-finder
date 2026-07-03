import {
  sendMessage,
  getMessages,
} from "../services/message.service.js";

export const create = async (req, res) => {
  try {
    const message = await sendMessage(
      req.params.conversationId,
      req.user.id,
      req.body.content
    );

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const messages = await getMessages(
      req.params.conversationId,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};