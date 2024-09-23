import express, { Request, Response } from "express";
import { Post } from "../models/post";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const posts = await Post.find().exec();
  res.json(posts);
});

router.get("/:id", async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id).exec();
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(post);
});

router.post("/", async (req: Request, res: Response) => {
  const post = new Post(req.body);
  await post.save();
  res.json(post);
});

router.put("/:id", async (req: Request, res: Response) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(post);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await Post.findByIdAndRemove(req.params.id);
  res.json({ message: "Post deleted" });
});

export default router;
