import React from 'react';
import {
  Typography,
  ListItem,
  List,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  InputLabel,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { Airport } from 'types';

import { useStyles } from './styles';

interface AirportListProps {
  loading?: boolean;
  onSelectAirport: (airport: Airport | null) => void;
  airports: Airport[];
}

export const AirportList = ({ loading, airports, onSelectAirport }: AirportListProps) => {
  const classes = useStyles();
  const [selectedAirport, setSelectedAirport] = React.useState<string | null>(null);

  const handleToggle = (airportId: string) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const selected = airports.find((airport) => airport.id === airportId);

    if (selected) {
      if (checked) {
        setSelectedAirport(selected.name);
        onSelectAirport(selected);
      } else {
        setSelectedAirport(null);
        onSelectAirport(null);
      }
    }
  };

  const renderItems = () => {
    return airports.map((airport) => (
      <ListItem key={airport.id} value={airport.cityId}>
        <ListItemText id="switch-list-label-wifi" primary={airport.name}>
          {airport.name}
        </ListItemText>
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            color="primary"
            onChange={handleToggle(airport.id)}
            checked={selectedAirport === airport.name}
            inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    ));
  };

  return (
    <>
      <InputLabel required={true} className={classes.inputLabel}>
        <Typography variant="h6" component={'span'} color="textPrimary">
          Select Airport
        </Typography>
      </InputLabel>
      {loading ? (
        <div className={classes.root}>
          {[...new Array(4)].map((_, index) => (
            <Skeleton className={classes.skeletonListItem} variant="rect" animation="wave" height={24} key={index} />
          ))}
        </div>
      ) : (
        <List className={classes.root}>{renderItems()}</List>
      )}
    </>
  );
};
