// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error: boolean;
  message: string;
  responseId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { body } = req;
    const date = new Date().toLocaleDateString(undefined, {
      timeZone: "Asia/Kolkata",
    });
    try {
      const client = await MongoClient.connect(process.env.DB_URL as string);

      const db = client.db("feedback-2022");
      const collection = db.collection("feedback-data");
      const dataToBeSaved = {
        ...body,
        date,
      };
      const savedPost = await collection.insertOne(dataToBeSaved);
      res.status(200).json({
        error: false,
        message: "Feedback submitted successfully",
        responseId: savedPost.insertedId.toString(),
      });
      await client.close();
    } catch (err) {
      res.status(500).json({
        error: true,
        message: "Error connecting to DB",
      });
    }
  } else {
    res.status(405).json({error: true, message: "Invalid request"})
  }
}
