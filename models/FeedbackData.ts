import { ObjectId } from "mongodb";

export interface RatingData  {
    "Pace of Delivery": number,
    "Quality of Teaching": number,
    "Clearing of Doubt": number,
    "Encourage Questions": number,
    "Ask Questions": number,
    "Ask Challenging Questions": number,
    "Helps weak Students": number,
    "Subject Expertise": number,
}

export default interface FeedbackData {
    _id: ObjectId;
    ratingData: { [key: string]: RatingData};
    section: string;
    semester: number;
    date: string;
}