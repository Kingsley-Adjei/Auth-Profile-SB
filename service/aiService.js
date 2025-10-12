import axios from "axios";
import { AI_SERVICE_URL } from "../config/env";

const AI_URL = AI_SERVICE_URL;

export async function getMatchFromAI(userSkills, taskRequirements) {
  const payload = { userSkills, taskRequirements };
  const response = await axios.post(AI_URL, payload, { timeout: 10000 });
  return response.data;
}
