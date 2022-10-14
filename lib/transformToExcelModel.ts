import { FeedbackData } from "../models/Feedback.model";

const transformData = (data: FeedbackData[]) => {
  return data.reduce((acc: any[], cur) => {
    for (let key in cur.ratingData) {
      if (!acc.some((element: any) => element.sheet === key)) {
        acc.push({
          sheet: key,
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
            { label: "Section", value: "Sections" },
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
      } else if (acc.some((element: any) => element.sheet === key)) {
        const index = acc.findIndex((element) => element.sheet === key);
        acc[index].content.push({
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
};

export default transformData;
