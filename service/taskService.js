import { SUPABASE } from "../supabaseClient.js";

export const createTask = async (title, description, requirements) => {
  if (!title || !requirements) {
    throw new Error("title and requirements must be passed in");
  }
  const { data, error } = await SUPABASE.from("tasks")
    .insert([{ title, description, requirements }])
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const getTask = async () => {
  const { data, error } = await SUPABASE.from("tasks")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};
