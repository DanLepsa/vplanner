import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper } from '@material-ui/core';

import { SelectLocation, SelectCurrency, AirportList } from 'components';
import { Airport, City } from 'types';

import { useData } from './useData';

export const Dashboard = () => {
  const { pending, error, airports, getAirportsByLocation, classes } = useData();

  console.log('state is ', airports);

  const [location, setLocation] = useState<City | null>(null);
  const [currency, setCurrency] = useState<string>('');

  const handleSelectLocation = (location: City) => {
    setLocation(location);
  };

  const handleSelectCurrency = (currency: string) => {
    setCurrency(currency);
  };

  const handleSelectedAirport = (airport: Airport | null) => {
    if (!airport) {
      return;
    }

    console.log('selected airport ', airport);
  };

  useEffect(() => {
    if (location) {
      getAirportsByLocation(location);
    }
  }, [location, setLocation]);

  return (
    <Grid container justify="center" style={{ minHeight: '100vh' }}>
      <Container maxWidth="lg" className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container direction="column" justify="center" alignItems="center">
            <Grid container spacing={3} className={classes.gridContainer}>
              <Grid item xs={12} sm={6}>
                <SelectLocation onSelectLocation={handleSelectLocation} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectCurrency value={currency} onSelectCurrency={handleSelectCurrency} />
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.gridContainer}>
              <Grid item xs={12} sm={6}>
                <AirportList loading={pending} airports={airports} onSelectAirport={handleSelectedAirport} />
              </Grid>
              <Grid item xs={12} sm={6}>
                dsa
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Grid>
  );
};
