// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../lib/dbConnect'
import Feedback, { FeedbackData } from "../../../../models/Feedback.model"
type Data = {
  error: boolean
  message: string 
  data?: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === "GET") {
        const { month, year, semester } = req.query
        const monthNumber = month && typeof month === "string" && +month
        const yearNumber = year && typeof year === "string" && +year
        const semesterNumber = semester && typeof semester === "string" && +semester
        try {
            const client = await dbConnect()
            if (client) {
                const data = await Feedback.find()
                const filteredData: FeedbackData[] = data.filter(feedbackData => feedbackData.semester === semesterNumber && 
                                                 new Date(feedbackData.date).getMonth() + 1 === monthNumber &&
                                                new Date(feedbackData.date).getFullYear() === yearNumber
                                                )

            res.status(200).json({ error: false, message: 'Success', data: filteredData.length })
            }
        } catch (err) {
            res.status(200).json({ error: true, message: 'Failed to get data'}) 
        }

    } else {
        res.status(200).json({ error: true, message: 'Method not supported'})
    }
}
