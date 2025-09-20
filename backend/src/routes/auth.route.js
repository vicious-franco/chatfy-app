import express from "express";

const AuthRouter = express.Router();

AuthRouter.post("/signup", (req, res) => {
  res.send({ message: "welcome..." });
});
AuthRouter.post("/login", (req, res) => {});
AuthRouter.post("/logout", (req, res) => {});

export default AuthRouter;
