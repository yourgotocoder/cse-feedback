import React, { useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import useWindowDimensions from "../../hooks/getWindowDimension";

type Props = {
  label?: string;
  handleDateChange: (newDate: Dayjs) => void;
  minDate?: Dayjs;
  disabledPicker: boolean;
};

const DatePicker = (props: Props) => {
  const { width } = useWindowDimensions();

  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    
    newValue && props.handleDateChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        {width && width > 600 && (
          <DesktopDatePicker
            label={props.label}
            inputFormat="DD/MM/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
            disabled={props.disabledPicker}
            minDate={dayjs(props.minDate)}
          />
        )}
        {width && width <= 600 && (
          <MobileDatePicker
            label={props.label}
            inputFormat="DD/MM/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
            disabled={props.disabledPicker}
            minDate={dayjs(props.minDate)}
          />
        )}
      </Stack>
    </LocalizationProvider>
  );
};

export default DatePicker;
