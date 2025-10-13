import axios from "axios";
import {
  GEMINI_API_KEY,
  GEMINI_API_VERSION,
  GEMINI_BASE_URL,
  GEMINI_MODEL,
  GEMINI_TIMEOUT,
} from "../config/env.js";

const GEMINI_API_URL = `${GEMINI_BASE_URL}/${GEMINI_API_VERSION}/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

export async function getMatchFromGemini(
  userSkills = [],
  taskRequirements = []
) {
  try {
    const prompt = `
You are an AI model that evaluates how well a user's skills match a given task.

Compare the user's skills with the task's required skills and output a JSON object **only** in this format:
{
  "match_score": number (between 0.0 and 1.0),
  "comment": string
}

Rules for match_score:
- Must always be a decimal number between 0.0 and 1.0.
- 0.8–1.0 → strong match
- 0.4–0.79 → moderate match
- 0.0–0.39 → weak match

Rules for comment:
- Be concise (under 15 words)
- Follow this pattern:
  - Strong match → "Strong match in [top 1–2 matching skills]"
  - Moderate match → "Moderate match — missing [missing skills]"
  - Weak match → "Weak match — lacks required [key skills]"
- Avoid long explanations or full sentences.

Example responses:
{
  "match_score": 0.9,
  "comment": "Strong match in React and Firebase"
}
{
  "match_score": 0.45,
  "comment": "Moderate match — missing backend experience"
}
{
  "match_score": 0.2,
  "comment": "Weak match — lacks AI API and Node.js skills"
}

User Skills: ${JSON.stringify(userSkills)}
Task Requirements: ${JSON.stringify(taskRequirements)}
`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
    };

    const { data } = await axios.post(GEMINI_API_URL, payload, {
      headers: { "Content-Type": "application/json" },
      timeout: GEMINI_TIMEOUT,
    });

    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    // 🧹 Clean up Markdown formatting like ```json ... ```
    text = text.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(text);
    // ✅ enforce 0–1 range
    if (typeof parsed.match_score === "number") {
      if (parsed.match_score > 1) parsed.match_score = parsed.match_score / 100;
      parsed.match_score = Math.min(Math.max(parsed.match_score, 0), 1);
    }
    return parsed;
  } catch (err) {
    console.error("❌ Gemini API error:", err.message);
    return {
      match_score: 0,
      comment: "AI service unavailable, using fallback logic.",
    };
  }
}
