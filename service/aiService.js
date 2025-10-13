import axios from "axios";
import { AI_SERVICE_URL } from "../config/env.js  ";

const AI_URL = AI_SERVICE_URL;

export async function getMatchFromAI(userSkills, taskRequirements) {
  try {
    const payload = { userSkills, taskRequirements };
    const response = await axios.post(AI_URL, payload, { timeout: 10000 });
    return response.data;
  } catch (error) {
    console.error("Error calling Ai service", error.message);
    throw new Error("Failed to get AI match result");
  }
}
