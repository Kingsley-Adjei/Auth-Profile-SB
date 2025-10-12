import { config } from "dotenv";

config();

export const { PORT, NODE_ENV, SUPABASE_URL, SUPABASE_KEY, AI_SERVICE_URL } =
  process.env;
