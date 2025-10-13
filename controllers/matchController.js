import { getMatchFromGemini } from "../service/aiGeminiService.js";
import {
  fetchTaskRequirements,
  fetchUserSkills,
} from "../service/matchService.js";

export const matchController = async (req, res) => {
  try {
    const { user_id, task_id } = req.body;
    if (!user_id || !task_id) {
      return res.status(400).json({
        success: false,
        message: "User_id and task_id are required",
      });
    }
    //fetching data from subabase
    const user = await fetchUserSkills(user_id);
    const task = await fetchTaskRequirements(task_id);

    if (!user || !user.skills) {
      return res.status(404).json({
        success: false,
        message: "User or User skills not found",
      });
    }
    if (!task || !task.requirements) {
      return res.status(404).json({
        success: false,
        message: "Task || Task requirements not found",
      });
    }

    // Talking to microservice
    const aiResponse = await getMatchFromGemini(user.skills, task.requirements);

    //returning formatted results
    res.status(200).json({
      success: true,
      user_id,
      task_id,
      match_score: aiResponse.match_score,
      Comment: aiResponse.comment,
    });
  } catch (error) {
    console.log("Something bad occured", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
