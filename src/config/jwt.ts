import jwt from "jsonwebtoken";

const secretKey = "your-secret-key";

export const generateToken = (user: any) => {
  const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "1h" });
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return null;
  }
};
