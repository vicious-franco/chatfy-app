import { config } from "dotenv";
config();
import path from "path";

import express from "express";
import AuthRouter from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import connectDB from "./config/DBconfig.js";

const app = express();

const __dirname = path.resolve();
// middleware
app.use(express.json()); // req.body
app.use("/api/auth", AuthRouter);
app.use("/api/messages", messageRoute);

const port = process.env.PORT || 4000;
connectDB();

console.log(path.join(__dirname, "../frontend/dist/index.html"));
// make it a production ready
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(port, () =>
  console.log(`server has started on http://localhost:${port}`)
);
