import { config } from "dotenv";

config();

export const {
  PORT,
  NODE_ENV,
  SUPABASE_URL,
  SUPABASE_KEY,
  AI_SERVICE_URL,
  GEMINI_API_KEY,
  GEMINI_BASE_URL,
  GEMINI_API_VERSION,
  GEMINI_MODEL,
  GEMINI_TIMEOUT,
} = process.env;
