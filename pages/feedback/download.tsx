import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DatePicker from "../../components/UI/DatePicker";
import dayjs, { Dayjs } from "dayjs";
//

type Props = {};

const Download = (props: Props) => {
  const handleStartDateChange = (newDate: Dayjs | null) => {
    console.log(newDate);
  };

  const [minDate, setMinDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    const getMinDate = async () => {
      const response = await fetch("/api/feedback/data/date-range", {
        method: "GET",
      });
      const data = await response.json();
      setMinDate(dayjs(new Date(data.startDate)));
      console.log(new Date(data.startDate))
      // console.log(dayjs(new Date(data.startDate)));
    };
    getMinDate();
  }, []);

  return (
    <div>
      <Card
        sx={{
          minWidth: 300,
          maxWidth: 500,
          minHeight: 300,
          maxHeight: 600,
          margin: "0 auto",
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translateY(-50%) translateX(-50%)",
        }}
      >
        <CardContent>
          <DatePicker
            label="Start Date"
            minDate={minDate}
            handleDateChange={handleStartDateChange}
            disabledPicker={minDate === null ? true : false}
          />
          <Typography variant="h5" component="div"></Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Download;
