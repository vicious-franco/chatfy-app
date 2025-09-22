import { config } from "dotenv";
config();
import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  const regToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7h",
  });
  res.cookie("register-token", regToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
