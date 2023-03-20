import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DatePicker from "../../components/UI/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { Stack } from "@mui/material";
//
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Props = {};

const Download = (props: Props) => {
  const [semester, setSemester] = useState<number>(3);
  const handleSemesterChange = (event: SelectChangeEvent) => {
    const semesterString = event.target.value as string;
    setSemester(+semesterString);
  };

  const [minDate, setMinDate] = useState<Dayjs>();

  const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date()));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(new Date()));

  const handleStartDateChange = (newDate: Dayjs) => {
    setStartDate(newDate);
  };
  const handleEndDateChange = (newDate: Dayjs) => {
    setEndDate(newDate);
  };

  useEffect(() => {
    const getMinDate = async () => {
      const response = await fetch("/api/feedback/data/date-range", {
        method: "GET",
      });
      const data = await response.json();
      setMinDate(dayjs(new Date(data.startDate)));
    };
    getMinDate();
  }, []);

  const generateDownloadLink = () => {
    console.log(startDate, endDate, semester)
  };

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
          <Stack spacing={3}>
            <DatePicker
              label="Start Date"
              minDate={minDate}
              handleDateChange={handleStartDateChange}
              disabledPicker={typeof minDate === 'undefined' ? true : false}
            />
            <DatePicker
              label="End Date"
              minDate={minDate}
              handleDateChange={handleEndDateChange}
              disabledPicker={minDate === null ? true : false}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Semester</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={semester.toString()}
                label="Semester"
                onChange={handleSemesterChange}
              >
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={generateDownloadLink}
          >
            {" "}
            Generate Download Link
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Download;
