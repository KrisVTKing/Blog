import { model, Schema } from "mongoose";
import { hash } from "../utils/hash";

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await hash(user.password);
  next();
});

export const User = model("User", userSchema);
