import React from 'react';
import { TextField, MenuItem, InputLabel } from '@material-ui/core';

import { currencies } from 'types';

import { useStyles } from './styles';

interface SelectCurrencyProps {
  onSelectCurrency: (currency: string) => void;
  value?: string;
}

export const SelectCurrency = ({ value, onSelectCurrency }: SelectCurrencyProps) => {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState<string>(value ? value : '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);

    onSelectCurrency(event.target.value);
  };

  const renderCurrencies = () => {
    return currencies.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ));
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <InputLabel required={true} className={classes.inputLabel}>
        Select Currency
      </InputLabel>
      <TextField id="outlined-select-currency" select value={currency} onChange={handleChange} variant="outlined">
        {renderCurrencies()}
      </TextField>
    </form>
  );
};
