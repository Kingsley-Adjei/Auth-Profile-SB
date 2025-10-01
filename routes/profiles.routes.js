import { Router } from "express";
import {
  createProfileController,
  deleteProfileController,
  getAllProfilesController,
  getUserProfileController,
  updateProfileController,
} from "../controllers/profilesController.js";

const profilesRouter = Router();

profilesRouter.post("/", createProfileController);
profilesRouter.put("/:id", updateProfileController);
profilesRouter.get("/", getAllProfilesController);
profilesRouter.get("/:id", getUserProfileController);
profilesRouter.delete("/:id", deleteProfileController);

export default profilesRouter;
