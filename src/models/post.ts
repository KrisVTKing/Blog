import { model, Schema } from "mongoose";

const postSchema = new Schema({
  title: String,
  content: String,
  author: String,
});

export const Post = model("Post", postSchema);
