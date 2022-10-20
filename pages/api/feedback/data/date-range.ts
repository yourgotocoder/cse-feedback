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
  startDate?: Date;
  data?: any;
  err?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      const client = await MongoClient.connect(process.env.DB_URL as string);
      const db = client.db("feedback-2022");
      const collection = db.collection("feedback-data");
      try {
        const data = await collection.find({}).toArray();
        const minDate = data.reduce((previousValue, currentValue) => {
          const dateValue = new Date(currentValue.date);
          if (dateValue < previousValue) {
            previousValue = dateValue;
          }
          return previousValue;
        }, new Date());
        const startDate = new Date(minDate);
        await client.close();
        res.status(200).json({ error: false, message: "Success", startDate });
      } catch (err) {
        res.status(404).json({ error: true, message: "Could not find data" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ error: true, message: "Could not connect to database" });
    }
  } else {
    res.status(405).json({ error: true, message: "Invalid request" });
  }
}
