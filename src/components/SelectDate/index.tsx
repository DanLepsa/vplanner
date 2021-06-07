import 'date-fns';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, DatePickerProps } from '@material-ui/pickers';
import { FormControlLabel, InputLabel, Switch, useTheme } from '@material-ui/core';

import { useStyles } from './styles';

interface SelectDateProps extends Partial<DatePickerProps> {
  label?: string;
  isRequired?: boolean;
  date: Date | null;
  onSelectDate: (date: Date | null) => void;
  errorMessage?: string;
  isDisabled?: boolean;
  onSwitchChange?: (checked: boolean) => void;
}

export const SelectDate = ({
  label,
  date,
  isRequired,
  onSelectDate,
  isDisabled,
  errorMessage,
  minDate,
  onSwitchChange,
}: SelectDateProps) => {
  const classes = useStyles();
  const { spacing } = useTheme();

  const [selectedDate, setSelectedDate] = useState<Date | null>(date ? date : null);
  const [isAnytime, setIsAnytime] = useState<boolean>(false);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);

    onSelectDate(date);
  };

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setIsAnytime(checked);

    onSwitchChange && onSwitchChange(checked);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <InputLabel required={isRequired} className={classes.inputLabel} error={!!errorMessage?.length}>
        {label || 'Select Date'}
      </InputLabel>
      <Grid container>
        <KeyboardDatePicker
          disabled={isDisabled}
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
        <FormControlLabel
          value="end"
          control={<Switch color="primary" checked={isAnytime} onChange={handleChangeSwitch} />}
          label="Anytime"
          labelPlacement="end"
          style={{ marginLeft: spacing(0.5) }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};
