// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import xlsx, { IJsonSheet, ISettings } from "json-as-xlsx";
import { MongoClient, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import transformData from "../../../../lib/transformToExcelModel";
import Feedback, { FeedbackData } from "../../../../models/Feedback.model";

type Data = {
  error: boolean;
  message: string;
  count?: number;
  data?: any;
  err?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const { startDate, endDate, semester } = req.query;
    const semesterNumber =
      semester && typeof semester === "string" && +semester;
    const startDateObj =
      startDate && typeof startDate === "string" && new Date(startDate);
    const endDateObj =
      endDate && typeof endDate === "string" && new Date(endDate);
    console.log(startDateObj, endDateObj);
    if (typeof semesterNumber !== "number") {
      res.status(405).json({ error: true, message: "Invalid query" });
      return;
    }
    try {
      const client = await dbConnect();
      if (client) {
        const data = await Feedback.find();
        const filteredData = data.filter(
          (element) =>
            element.semester == semester &&
            startDateObj &&
            new Date(element.date) >= startDateObj &&
            endDateObj &&
            new Date(element.date) <= endDateObj
        );
        const transformedData: IJsonSheet[] = transformData(filteredData);
        const settings: ISettings = {
          writeOptions: {
            type: "buffer",
            bookType: "xlsx",
          },
        };
        const buffer = xlsx(transformedData, settings);
        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-disposition": "attachment; filename=MySheet.xlsx",
        });
        res.end(buffer);
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(405).json({ error: true, message: "Invalid method" });
  }
}
