import express from "express";
import { signup } from "../controllers/auth.controllers.js";

const AuthRouter = express.Router();

AuthRouter.post("/signup", signup);
AuthRouter.post("/login", (req, res) => {});
AuthRouter.post("/logout", (req, res) => {});

export default AuthRouter;
