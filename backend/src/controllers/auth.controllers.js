import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utilities/utilis.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "all fieds are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        messae: "Password should be at least 6 characters",
      });
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    const user = await UserModel.findOne({ email });
    console.log(user);

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);
      res.status(201).json({
        success: true,
        data: {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePic: newUser.profilePic,
        },
      });
      // todo: send a welcome email to the user
    }
  } catch (error) {
    console.log("Error in signup controller: " + error.message);
    res.status(500).json({ message: "Enternal server error" });
  }
};
