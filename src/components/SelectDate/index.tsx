import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, DatePickerProps } from '@material-ui/pickers';
import { InputLabel } from '@material-ui/core';

import { useStyles } from './styles';

interface SelectDateProps extends Partial<DatePickerProps> {
  label?: string;
  isRequired?: boolean;
  date: Date | null;
  onSelectDate: (date: Date | null) => void;
  errorMessage?: string;
}

export const SelectDate = ({ label, date, isRequired, onSelectDate, errorMessage, minDate }: SelectDateProps) => {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(date ? date : null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);

    onSelectDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <InputLabel required={isRequired} className={classes.inputLabel} error={!!errorMessage?.length}>
        {label || 'Select Date'}
      </InputLabel>
      <Grid container>
        <KeyboardDatePicker
          inputVariant="outlined"
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          minDate={minDate || undefined}
          minDateMessage={'Return date must be after the outbound date!'}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};
