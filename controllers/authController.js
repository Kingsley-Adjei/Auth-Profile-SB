import SUPABASE from "../index.js";

export const SignUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing email or password",
      });
    }
    const { data, error } = await SUPABASE.auth.signUp({ email, password });

    if (error) {
      console.error("Supabase Error:", error.message);
      if (error.code === "email_address_invalid") {
        return res.status(401).json({
          success: false,
          message: "Invalid or wrong email address",
          error: error.message,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Something went wrong",
          error: error.message,
        });
      }
    }
    const { user: supabaseUser } = data || {};
    if (!data?.user) {
      res.status(400).json({
        success: false,
        message: "Missing user",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Signed Up successfully",
      user: supabaseUser,
    });
  } catch (err) {
    console.error("Unepected Error:", err.message);
    res.status(500).json({
      success: false,
      message: "An Unexpected error occurred",
      error: err.message,
    });
  }
};

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing email or password",
      });
    }

    const { data, error } = await SUPABASE.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Supabase error:", error.message);
      if (error.code == "invalid_credentials") {
        return res.status(401).json({
          success: false,
          message: "Invalid Email or Password",
          error: error.message,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Something went wrong",
        });
      }
    }
    const { user: supabaseUser } = data || {};
    if (!data?.user) {
      return res.status(400).json({
        success: false,
        message: "Missing user",
      });
    }
    res.cookie("access_token", data.session.access_token, {
      httpOnly: true,
      sameSite: "strict",
    });
    res.status(200).json({
      success: true,
      message: "User Signed In successfully",
      user: supabaseUser,
    });
  } catch (err) {
    console.error("Something Unexpected occured", err.message);
    res.status(500).json({
      success: false,
      message: "An unexpected error occured",
      error: err.message,
    });
  }
};

export const SignOut = async (req, res) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "User already signed out",
      });
    }

    const { error } = await SUPABASE.auth.signOut();
    if (error) {
      console.error("Supabase Error:", error.message);
      return res.status(400).json({
        success: false,
        message: "Error signing out, try again later",
      });
    }

    res.clearCookie("access_token").status(200).json({
      success: true,
      message: "User logout successfully",
    });
  } catch (err) {
    console.error("An error occured", err.message);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
