// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import Feedback, { FeedbackData } from "../../../../models/Feedback.model";

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
    const { startDate, endDate, semester } = req.query;
    try {
      const client = await dbConnect();
      if (client) {
        const data = await Feedback.find();
        res.status(200).json({ error: false, message: "Success", data });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(405).json({ error: true, message: "Invalid method" });
  }
}
