import { Router } from "express";

import {
  createConversationController,
  getAllConversationsController,
  getMessagesController,
  sendMessageController,
} from "../controllers/messageController.js";
const messageRouter = Router();

messageRouter.post("/conversations", createConversationController);
messageRouter.get("/conversations", getAllConversationsController);

messageRouter.post("/conversations/:id/messages", sendMessageController);
messageRouter.get("/conversations/:id/messages", getMessagesController);

export default messageRouter;
