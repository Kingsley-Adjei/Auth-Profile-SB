import { SUPABASE } from "../supabaseClient.js";

export const fetchUserSkills = async (user_id) => {
  const { data, error } = await SUPABASE.from("profiles")
    .select("skills")
    .eq("id", user_id)
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const fetchTaskRequirements = async (task_id) => {
  const { data, error } = await SUPABASE.from("tasks")
    .select("requirements")
    .eq("id", task_id)
    .single();

  if (error) {
    throw error;
  }
  return data;
};
