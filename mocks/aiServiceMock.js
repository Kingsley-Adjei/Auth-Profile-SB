// src/mocks/aiServiceMock.js
import express from "express";
const app = express();
app.use(express.json());

app.post("/ai/match", (req, res) => {
  const { userSkills = [], taskRequirements = [] } = req.body;
  // naive match score: intersection / union (example)
  const setA = new Set(userSkills);
  const intersection = taskRequirements.filter((r) => setA.has(r)).length;
  const union = new Set([...userSkills, ...taskRequirements]).size || 1;
  const score = +(intersection / union).toFixed(2);
  let comment = "No strong match";
  if (score >= 0.75) comment = "Strong match";
  else if (score >= 0.4) comment = "Moderate match";
  return res.json({ match_score: score, comment });
});

app.listen(5000, () => console.log("Mock AI service listening 5000"));
