import {
  createProfile,
  deleteProfile,
  getAllProfiles,
  getUserProfile,
  updateProfile,
} from "../service/profileService.js";
import SUPABASE from "../index.js";
import { isValidEmail, ValidateBio } from "../Utils/validator.js";

export const createProfileController = async (req, res) => {
  try {
    const { name, email, skills, bio, location } = req.body;

    //checking if email is present
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email required",
      });
    }

    //checking email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    //checking bio error
    const bioError = ValidateBio(bio);
    if (bioError) {
      return res.status(400).json({
        success: false,
        message: bioError,
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

    const { name, bio, location, skills } = req.body;

    const bioError = ValidateBio(bio);
    if (bioError) {
      return res.status(400).json({
        success: false,
        message: bioError,
      });
    }
    const newProfile = await updateProfile(user, {
      name,
      bio,
      location,
      skills,
    });

    res.status(200).json({
      success: true,
      message: "User Profile updated successfully",
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
    const getProfile = await getUserProfile(user);
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
        success: false,
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
