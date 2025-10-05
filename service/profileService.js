import { SUPABASE } from "../supabaseClient.js";

export const createProfile = async (profileInfo) => {
  const { data, error } = await SUPABASE.from("profiles")
    .insert([profileInfo])
    .select("name, email, bio, location, skills, created_at")
    .single();

  if (error) {
    if (error.code === "23505") throw new Error("Email already exists");
    throw error;
  }
  return data;
};

export const updateProfile = async (uuid, newProfileData) => {
  const { data, error } = await SUPABASE.from("profiles")
    .update(newProfileData)
    .select("name, email, bio, location, skills, updated_at")
    .match({ uuid })
    .single();

  if (error) {
    throw new error();
  }
  return data;
};

export const getAllProfiles = async () => {
  const { data, error } = await SUPABASE.from("profiles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    throw new error();
  }
  return data;
};
export const getUserProfile = async (uuid) => {
  const { data, error } = await SUPABASE.from("profiles")
    .select("*")
    .single()
    .match({ uuid });
  if (error) {
    throw new error();
  }
  return data;
};

export const deleteProfile = async (uuid) => {
  const { data, error } = await SUPABASE.from("profiles")
    .delete()
    .match({ uuid });
  if (error) {
    throw new error();
  }
  return data;
};
