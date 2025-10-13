import { Router } from "express";
import {
  createTaskController,
  getTaskController,
} from "../controllers/taskController.js";

const taskRouter = Router();
taskRouter.post("/tasks", createTaskController);
taskRouter.get("/tasks", getTaskController);

export default taskRouter;
