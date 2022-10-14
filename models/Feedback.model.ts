import { ObjectId } from "mongodb";
import mongoose, { Schema, model, Document, models } from "mongoose";

interface RatingData {
  "Pace of Delivery": number;
  "Quality of Teaching": number;
  "Clearing of Doubt": number;
  "Encourage Questions": number;
  "Ask Questions": number;
  "Ask Challenging Questions": number;
  "Helps weak Students": number;
  "Subject Expertise": number;
}

export interface FeedbackData extends Document {
  ratingData: { [key: string]: RatingData };
  section: string;
  semester: number;
  date: string;
}

const FeedbackSchema: Schema = new Schema({
  ratingData: Schema.Types.Mixed,
  section: String,
  semester: Number,
  date: String,
});

export default mongoose.models.Feedback || mongoose.model<FeedbackData>("Feedback", FeedbackSchema, "feedback-data");


