import { Router } from "express";
import { matchController } from "../controllers/matchController.js";

const matchRouter = Router();

matchRouter.post("/match", matchController);
export default matchRouter;
