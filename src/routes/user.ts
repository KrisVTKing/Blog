import express, { Request, Response } from "express";
import { User } from "../models/user";
import { generateToken } from "../config/jwt";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await User.find().exec();
  res.json(users);
});

router.get("/:id", async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).exec();
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

router.post("/", async (req: Request, res: Response) => {
  const user = new User(req.body);
  await user.save();
  const token = generateToken(user);
  res.json({ token });
});

router.post("/login", async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const isValidPassword = await user.comparePassword(req.body.password);
  if (!isValidPassword) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const token = generateToken(user);
  res.json({ token });
});

export default router;
