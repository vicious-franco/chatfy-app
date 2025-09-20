import { config } from "dotenv";
config();

import express from "express";
import AuthRouter from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";

const app = express();

// middleware
app.use(express.json());
app.use("/api/auth", AuthRouter);
app.use("/api/messages", messageRoute);

const port = process.env.PORT || 4000;

app.listen(port, () =>
  console.log(`server has started on http://localhost:${port}`)
);
