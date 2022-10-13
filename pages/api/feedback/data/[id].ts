// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  MongoAPIError,
  MongoClient,
  MongoNotConnectedError,
  ObjectId,
} from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error: boolean;
  message: string;
  data?: any;
  err?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const client = await MongoClient.connect(process.env.DB_URL as string);
      const db = client.db("feedback-2022");
      const collection = db.collection("feedback-data");
      try {
        const feedbackData = await collection.findOne({
          _id: new ObjectId(id as string),
        });
        await client.close();
        if (feedbackData === null) throw new Error("Invalid ID");
        res
          .status(200)
          .json({ error: false, message: "Success", data: feedbackData });
      } catch (err) {
        console.log(err);
        res.status(405).json({ error: true, message: "No result found", err });
      }
    } catch (err) {
      console.log(err);
      res.status(405).json({
        error: true,
        message: "Failed to connect to db",
        err: JSON.stringify(err),
      });
    }
  } else {
    res.status(405).json({ error: true, message: "Invalid request" });
  }
}
