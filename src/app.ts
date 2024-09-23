import express, { Request, Response } from "express";
import { connect } from "./config/database";
import postRouter from "./routes/post";
import userRouter from "./routes/user";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/posts", postRouter);
app.use("/users", userRouter);

connect()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
