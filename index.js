import express from "express";
import { PORT } from "./config/env.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import profilesRouter from "./routes/profiles.routes.js";
import messageRouter from "./routes/messages.route.js";
import { SUPABASE } from "./supabaseClient.js";
import matchRouter from "./routes/match.routes.js";
import taskRouter from "./routes/tasks.routes.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/profiles", profilesRouter);
app.use("/api", messageRouter);
app.use("/api", matchRouter);
app.use("/api", taskRouter);

app.listen(`${PORT}`, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const channel = SUPABASE.channel("realtime:messages");

channel
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "messages" },
    (payload) => {
      console.log("NEW MESSAGE RECEIVED IN REALTIME!");
      console.log("Message Text:", payload.new.text);
      console.log("Sender ID:", payload.new.sender_id);
      console.log("Conversation ID:", payload.new.conversation_id);
    }
  )
  .subscribe((status) => {
    if (status === "SUBSCRIBED") {
      console.log("Listening for new messages in realtime...");
    }
  });
