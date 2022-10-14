// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient, ObjectId } from "mongodb";
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
    const { startDate, endDate, semester } = req.query;
    res.status(200).json({ error: false, message: "Success", data: req.query });
  } else {
    res.status(405).json({ error: true, message: "Invalid method" });
  }
}
