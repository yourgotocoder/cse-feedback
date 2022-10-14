import { IJsonSheet } from "json-as-xlsx";
import { FeedbackData } from "../models/Feedback.model";

const transformData = (data: FeedbackData[]) => {
  const transformedData =  data.reduce((acc:IJsonSheet[], cur) => {
    for (let key in cur.ratingData) {
      const sheetName = key.replace('/', "").substring(0, 30);
      if (!acc.some((element: any) => element.sheet === sheetName)) {
        acc.push({
          sheet: sheetName,
          columns: [
            { label: "Pace of Delivery", value: "Pace of Delivery" },
            { label: "Quality of Teaching", value: "Quality of Teaching" },
            { label: "Clearing of Doubt", value: "Clearing of Doubt" },
            { label: "Encourage Questions", value: "Encourage Questions" },
            { label: "Ask Questions", value: "Ask Questions" },
            {
              label: "Ask Challenging Questions",
              value: "Ask Challenging Questions",
            },
            { label: "Helps weak Students", value: "Helps weak Students" },
            { label: "Subject Expertise", value: "Subject Expertise" },
            { label: "Section", value: "Section" },
          ],
          content: [
            {
              Section: cur.section,
              "Pace of Delivery": cur.ratingData[key]["Pace of Delivery"],
              "Quality of Teaching": cur.ratingData[key]["Quality of Teaching"],
              "Clearing of Doubt": cur.ratingData[key]["Clearing of Doubt"],
              "Encourage Questions": cur.ratingData[key]["Encourage Questions"],
              "Ask Questions": cur.ratingData[key]["Ask Questions"],
              "Ask Challenging Questions":
                cur.ratingData[key]["Ask Challenging Questions"],
              "Helps weak Students": cur.ratingData[key]["Helps weak Students"],
              "Subject Expertise": cur.ratingData[key]["Subject Expertise"],
            },
          ],
        });
      } else if (acc.some((element: any) => element.sheet === sheetName)) {
        const index = acc.findIndex((element) => element.sheet === sheetName);
        acc[index].content.push({
          Section: cur.section,
          "Pace of Delivery": cur.ratingData[key]["Pace of Delivery"],
          "Quality of Teaching": cur.ratingData[key]["Quality of Teaching"],
          "Clearing of Doubt": cur.ratingData[key]["Clearing of Doubt"],
          "Encourage Questions": cur.ratingData[key]["Encourage Questions"],
          "Ask Questions": cur.ratingData[key]["Ask Questions"],
          "Ask Challenging Questions":
            cur.ratingData[key]["Ask Challenging Questions"],
          "Helps weak Students": cur.ratingData[key]["Helps weak Students"],
          "Subject Expertise": cur.ratingData[key]["Subject Expertise"],
        });
      }
    }
    return acc;
  }, []);
  const averages = transformedData.reduce((acc: any, cur) => {
    const sheetName = cur.sheet;
    
    
    return acc;
  }, {})
  return transformedData;
};

export default transformData;
