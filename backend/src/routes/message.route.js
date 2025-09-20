import express from "express";

const messageRoute = express.Router();

messageRoute.get("/send", (req, res) => {
  res.send("message sent...");
});

export default messageRoute;
