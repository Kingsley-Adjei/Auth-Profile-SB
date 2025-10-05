import {
  sendMessage,
  getMessagesByConversation,
  createConversation,
  getAllConversations,
} from "../service/messageService.js";

export const createConversationController = async (req, res) => {
  try {
    const { user1_id, user2_id } = req.body;
    const result = await createConversation(user1_id, user2_id);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllConversationsController = async (req, res) => {
  try {
    const data = await getAllConversations();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const sendMessageController = async (req, res) => {
  try {
    const { id } = req.params;
    const { sender_id, text } = req.body;

    const data = await sendMessage(id, sender_id, text);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMessagesController = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 10, offset = 0 } = req.query;

    const data = await getMessagesByConversation(id, limit, offset);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
