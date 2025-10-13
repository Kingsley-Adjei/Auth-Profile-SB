import { SUPABASE } from "../supabaseClient";

export const fetchUserSkills = async (user_id) => {
  const { data: userData, error: userErr } = await SUPABASE.from("users")
    .select("skills")
    .eq("id", user_id)
    .single();

  if (userErr) {
    throw userErr();
  }
  return userData;
};

export const fetchTaskRequirements = async (task_id) => {
  const { data: taskData, error: taskErr } = await SUPABASE.from("tasks")
    .select("requirements")
    .eq("id", task_id)
    .single();

  if (taskErr) {
    throw taskErr();
  }
  return taskData;
};
