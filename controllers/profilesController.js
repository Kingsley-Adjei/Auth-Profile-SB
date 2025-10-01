import {
  createProfile,
  deleteProfile,
  getAllProfiles,
  updateProfile,
} from "../service/profileService.js";
import SUPABASE from "../index.js";

export const createProfileController = async (req, res) => {
  try {
    const { name, email, skills, bio, location } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email required",
      });
    }
    const profile = await createProfile({
      name,
      email,
      skills,
      bio,
      location,
    });
    res.status(201).json({
      success: true,
      message: "Profiles created successfully",
      data: profile,
    });
  } catch (err) {
    console.error("Error creating profiles");
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const {
      data: { user },
    } = await SUPABASE.auth.getUser();
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not logged in",
      });
    }

    const newProfile = await updateProfile(user, req.body);
    res.status(200).json({
      success: true,
      message: "User Profile updated succcessfully",
      data: newProfile,
    });
  } catch (err) {
    console.error("Error updating  user");
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const getAllProfilesController = async (req, res) => {
  try {
    const allProfiles = await getAllProfiles();
    res.status(200).json({
      success: true,
      message: "All profiles gotten successfully",
      data: allProfiles,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Could not fecth all Profiles",
      error: err.message,
    });
  }
};

export const getUserProfileController = async (req, res) => {
  try {
    const {
      data: { user },
    } = await SUPABASE.auth.getUser();
    if (!user) {
      console.error("User not signed in");
      return res.status(401).json({
        success: false,
        message: "User Not signed in",
      });
    }
    const getProfile = await getUserProfileController(user);
    res.status(200).json({
      success: true,
      message: "User Profile fetched successfully",
      getProfile,
    });
  } catch (err) {
    console.error("Error getting user profile");
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
export const deleteProfileController = async (req, res) => {
  try {
    const {
      data: { user },
    } = await SUPABASE.auth.getUser();
    if (!user) {
      return res.status(401).json({
        success: true,
        message: "User not signed in",
      });
    }
    const profile = await deleteProfile(user);
    res.status(200).json({
      success: true,
      message: "User profile deleted successfully",
      data: profile,
    });
  } catch (err) {
    console.error("Failed to delete User");
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
