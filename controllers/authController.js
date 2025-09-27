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
    const { user, error } = await SUPABASE.auth.signUp({ email, password });

    if (error) {
      console.error("Supabase Error:", error.message);
      return res.status(500).json({
        success: false,
        message: "something went wrong, can't Sign Up",
        error: error.message,
      });
    }
    res.status(200).json({
      success: true,
      message: "User signed Up successfully",
      data: user,
    });
  } catch (err) {
    console.error("Unepected Error:", err.message);
    res.status(500).json({
      sucess: false,
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
        sucess: false,
        message: "Invalid or missing email or password",
      });
    }

    const { data, user, error } = await SUPABASE.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Supabase error:", error.message);
      return res.status(500).json({
        sucess: false,
        message: "Something went wrong, Try again",
        error: error.message,
      });
    }
    res.cookie("access_token", data.session.access_token, { httpOnly: true });
    res.status(200).json({
      success: true,
      message: "User Signed In successfully",
      data: user,
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
  res.clearCookie("access_token");
};
