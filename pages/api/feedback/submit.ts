// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error: boolean;
  message: string;
  responseId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { body } = req;
  const date = new Date().toLocaleDateString(undefined, {
    timeZone: "Asia/Kolkata",
  });
  const client = await MongoClient.connect(process.env.DB_URL as string);
  if (client) console.log(`Connected to db`);
  await client.close();
  res.status(200).json({
    error: false,
    message: "Feedback submitted successfully",
    responseId: "",
  });
}
