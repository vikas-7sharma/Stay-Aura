import User from "../model/user.js";
import tokengen from "./token.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashPassword });
    const token = tokengen(newUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: "false",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...userWithoutPassword } = newUser._doc;
    return res.status(201).json({ message: "Signup successful", user: userWithoutPassword });

  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email }).populate(
      "listing", "title image1 image2 image3 description rent category city landmark"
    );

    if (!existingUser) {
      return res.status(400).json({ message: "User not exists" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = tokengen(existingUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: "false",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful", user: existingUser });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// NEW - Google Auth
export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: "google_oauth_" + Math.random().toString(36).slice(-8),
      });
    }

    const token = tokengen(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: "false",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Google login successful", user });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "logout error" });
  }
};