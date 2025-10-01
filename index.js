import express from "express";
import { createClient } from "@supabase/supabase-js";
import { PORT, SUPABASE_KEY, SUPABASE_URL } from "./config/env.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import profilesRouter from "./routes/profiles.routes.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/profiles", profilesRouter);

app.listen(`${PORT}`, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const SUPABASE = createClient(SUPABASE_URL, SUPABASE_KEY);
export default SUPABASE;
