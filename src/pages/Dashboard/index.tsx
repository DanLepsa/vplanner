import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Paper } from '@material-ui/core';
import { format } from 'date-fns';

import { SelectLocation, SelectCurrency, AirportList, SelectDate } from 'components';
import { Airport, City, BrowseDateRequestObject, currencies } from 'types';

import { useData } from './useData';

interface DashboardState {
  currency: string;
  outboundLocation: City | null;
  returnLocation: City | null;
  outboundDate: Date | null;
  returnDate: Date | null;
  outboundAirport: Airport | null;
  returnAirport: Airport | null;
}

interface DashboardErrorState {
  outboundLocation: string;
  returnLocation: string;
  outboundDate: string;
  returnDate: string;
  outboundAirport: string;
  returnAirport: string;
}

const today = new Date();

export const Dashboard = () => {
  const {
    pendingAirports,
    pendingAirportsOrigin,
    error,
    airports,
    airportsOrigin,
    getAirportsByReturnLocation,
    getAirportsByOutboundLocation,
    getBrowseDates,
    classes,
  } = useData();

  const [state, setState] = useState<DashboardState>({
    currency: currencies[0].value,
    outboundLocation: null,
    returnLocation: null,
    outboundDate: today,
    returnDate: null,
    outboundAirport: null,
    returnAirport: null,
  });

  const [errorState, setErrorState] = useState<DashboardErrorState>({
    outboundLocation: '',
    returnLocation: '',
    outboundDate: '',
    returnDate: '',
    outboundAirport: '',
    returnAirport: '',
  });

  const handleSelectLocation = (location: City) => {
    setState((prev) => ({ ...prev, returnLocation: location }));
  };

  const handleSelectOriginLocation = (location: City) => {
    setState((prev) => ({ ...prev, originLocation: location }));
  };

  const handleSelectCurrency = (currency: string) => {
    setState((prev) => ({ ...prev, currency }));
  };

  const handleSelectOutboundDate = (date: Date | null) => {
    setState((prev) => ({ ...prev, outboundDate: date }));
  };

  const handleSelectReturnDate = (date: Date | null) => {
    setState((prev) => ({ ...prev, returnDate: date }));
  };

  const handleSelectOutboundAirport = (airport: Airport | null) => {
    setState((prev) => ({ ...prev, outboundAirport: airport }));
  };

  const handleSelectReturnAirport = (airport: Airport | null) => {
    setState((prev) => ({ ...prev, returnAirport: airport }));
  };

  const handleSearch = () => {
    console.log(state.returnAirport);
    console.log(state.outboundAirport);
    console.log(state.outboundDate);
    console.log(state.returnDate);
    console.log(state.currency);
    // Error handling
    let isInvalid = false;

    if (!state.outboundAirport) {
      setErrorState((prev) => ({ ...prev, outboundAirport: 'An airport must be selected' }));
      isInvalid = true;
    } else {
      setErrorState((prev) => ({ ...prev, outboundAirport: '' }));
    }

    if (!state.returnAirport) {
      setErrorState((prev) => ({ ...prev, returnAirport: 'An airport must be selected' }));
      isInvalid = true;
    } else {
      setErrorState((prev) => ({ ...prev, returnAirport: '' }));
    }

    if (!state.outboundDate) {
      setErrorState((prev) => ({ ...prev, outboundDate: 'A date must be selected' }));
      isInvalid = true;
    } else {
      setErrorState((prev) => ({ ...prev, outboundDate: '' }));
    }

    if (isInvalid) {
      return;
    }

    // construct the payload
    const departureDate = format(state.outboundDate!, 'yyyy-mm-dd');
    let returnDate = '';

    if (state.returnDate) {
      returnDate = format(state.returnDate, 'yyyy-mm-dd');
    }

    const requestData: BrowseDateRequestObject = {
      locale: 'en-US',
      country: 'RO',
      currency: state.currency, // 'USD',
      originplace: state.outboundAirport!.id, // 'SFO-sky',
      outboundpartialdate: departureDate, // '2021-07-01',
      destinationplace: state.returnAirport!.id, // 'LAX-sky',
      ...(state.returnDate ? { inboundpartialdate: returnDate } : null),
    };

    console.log('request data is ', requestData);
    return;

    getBrowseDates(requestData);
    // The outbound date. Format “yyyy-mm-dd”, “yyyy-mm” or “anytime”.
    // The return date. Format “yyyy-mm-dd”, “yyyy-mm” or “anytime”. Use empty string for oneway trip.
  };

  useEffect(() => {
    if (state.returnLocation) {
      getAirportsByReturnLocation(state.returnLocation);

      setState((prev) => ({ ...prev, returnAirport: null }));
    }
  }, [state.returnLocation]);

  useEffect(() => {
    if (state.outboundLocation) {
      getAirportsByOutboundLocation(state.outboundLocation);

      setState((prev) => ({ ...prev, outboundAirport: null }));
    }
  }, [state.outboundLocation]);

  return (
    <Grid container justify="center" style={{ minHeight: '100vh' }}>
      <Container maxWidth="lg" className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container direction="column" justify="center" alignItems="center">
            <Grid container spacing={3} className={classes.gridContainer}>
              <Grid item xs={12} sm={6}>
                <SelectLocation onSelectLocation={handleSelectOriginLocation} label={'Select Origin'} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectLocation onSelectLocation={handleSelectLocation} />
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.gridContainer}>
              <Grid item xs={12} sm={6}>
                <AirportList
                  loading={pendingAirportsOrigin}
                  airports={airportsOrigin}
                  onSelectAirport={handleSelectOutboundAirport}
                  errorMessage={errorState.outboundAirport}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <AirportList
                  loading={pendingAirports}
                  airports={airports}
                  onSelectAirport={handleSelectReturnAirport}
                  errorMessage={errorState.returnAirport}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.gridContainer}>
              <Grid item xs={12}>
                <SelectCurrency value={state.currency} onSelectCurrency={handleSelectCurrency} />
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.gridContainer}>
              <Grid item xs={12} sm={6}>
                <SelectDate
                  label={'Outbound Date'}
                  isRequired={true}
                  onSelectDate={handleSelectOutboundDate}
                  minDate={today}
                  date={state.outboundDate}
                  errorMessage={errorState.outboundDate}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectDate
                  label={'Return Date'}
                  onSelectDate={handleSelectReturnDate}
                  minDate={state.outboundDate}
                  date={state.returnDate}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.gridContainer} alignContent="flex-end" alignItems="flex-end">
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleSearch} color="primary" className={classes.searchButton}>
                  Search
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Grid>
  );
};
