// supabaseClient
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "./config/env.js";

export const SUPABASE = createClient(SUPABASE_URL, SUPABASE_KEY);
