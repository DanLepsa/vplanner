import React from 'react';
import { InputLabel, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { cities, City } from 'types';

import { ListboxComponent } from './VirtualizationHelpers';
import { useStyles } from './styles';

interface SelectLocationProps {
  onSelectLocation: (location: City) => void;
}

export const SelectLocation = ({ onSelectLocation }: SelectLocationProps) => {
  const classes = useStyles();

  const handleOnChange = (event: React.ChangeEvent<any>, value: City | null) => {
    if (value) {
      onSelectLocation(value);
    }
  };

  return (
    <div>
      <InputLabel required={true} className={classes.inputLabel}>
        <Typography variant="h6" component={'span'} color="textPrimary">
          Select Destination
        </Typography>
      </InputLabel>
      <Autocomplete
        id="select-location-autocomplete"
        options={cities}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} variant="outlined" />}
        disableListWrap
        ListboxComponent={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
        onChange={handleOnChange}
      />
    </div>
  );
};
