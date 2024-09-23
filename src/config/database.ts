import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = "blog";

export const connect = async () => {
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(dbName);
  return db;
};
