import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Paper } from '@material-ui/core';
import { format } from 'date-fns';

import { SelectLocation, SelectCurrency, AirportList, SelectDate, FlightList } from 'components';
import { Airport, City, BrowseDateRequestObject, currencies, DateFormats } from 'types';

import { useData } from './useData';

interface DashboardState {
  currency: string;
  outboundLocation: City | null;
  returnLocation: City | null;
  outboundDate: Date | null;
  returnDate: Date | null;
  outboundAirport: Airport | null;
  returnAirport: Airport | null;
  isAnytimeOutboundDate: boolean;
  isAnytimeReturnDate: boolean;
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
    availableCarriers,
    availableQuotes,
    error,
    pending,
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
    isAnytimeOutboundDate: false,
    isAnytimeReturnDate: false,
  });

  const [errorState, setErrorState] = useState<DashboardErrorState>({
    outboundLocation: '',
    returnLocation: '',
    outboundDate: '',
    returnDate: '',
    outboundAirport: '',
    returnAirport: '',
  });

  const handleSelectReturnLocation = (location: City) => {
    if (location !== state.returnLocation) {
      setState((prev) => ({ ...prev, returnLocation: location }));
    }
  };

  const handleSelectOutboundLocation = (location: City) => {
    if (location !== state.outboundLocation) {
      setState((prev) => ({ ...prev, outboundLocation: location }));
    }
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

  const handleOutboundSwitchChange = (checked: boolean) => {
    setState({ ...state, isAnytimeOutboundDate: checked });
  };

  const handleReturnSwitchChange = (checked: boolean) => {
    setState({ ...state, isAnytimeReturnDate: checked });
  };

  const handleSearch = () => {
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

    if (!state.outboundDate && !state.isAnytimeOutboundDate) {
      setErrorState((prev) => ({ ...prev, outboundDate: 'A date must be selected' }));
      isInvalid = true;
    } else {
      setErrorState((prev) => ({ ...prev, outboundDate: '' }));
    }

    if (isInvalid) {
      return;
    }

    // construct the payload
    const departureDate = state.isAnytimeOutboundDate ? 'anytime' : format(state.outboundDate!, DateFormats.STANDARD);
    const returnDate = state.isAnytimeReturnDate
      ? 'anytime'
      : state.returnDate
      ? format(state.returnDate, DateFormats.STANDARD)
      : '';

    const requestData: BrowseDateRequestObject = {
      locale: 'en-US',
      country: 'RO',
      currency: state.currency, // 'USD',
      originplace: state.outboundAirport!.id, // 'SFO-sky',
      outboundpartialdate: departureDate, // '2021-07-01' or "anytime",
      destinationplace: state.returnAirport!.id, // 'LAX-sky',
      ...(state.returnDate && { inboundpartialdate: returnDate }),
    };

    console.log(state.outboundDate);
    console.log('request data is ', requestData);

    getBrowseDates(requestData);
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
    <Grid container justify="center" className={classes.background}>
      <Container maxWidth="lg" className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container direction="column" justify="center" alignItems="center">
            <Grid container spacing={3} className={classes.gridContainer}>
              <Grid item xs={12} sm={6}>
                <SelectLocation
                  onSelectLocation={handleSelectOutboundLocation}
                  label={'Select Origin'}
                  isDisabled={pending}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectLocation onSelectLocation={handleSelectReturnLocation} isDisabled={pending} />
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.gridContainer}>
              <Grid item xs={12} sm={6}>
                <AirportList
                  isDisabled={pending}
                  loading={pendingAirportsOrigin}
                  airports={airportsOrigin}
                  onSelectAirport={handleSelectOutboundAirport}
                  errorMessage={errorState.outboundAirport}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <AirportList
                  isDisabled={pending}
                  loading={pendingAirports}
                  airports={airports}
                  onSelectAirport={handleSelectReturnAirport}
                  errorMessage={errorState.returnAirport}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.gridContainer}>
              <Grid item xs={12}>
                <SelectCurrency value={state.currency} onSelectCurrency={handleSelectCurrency} isDisabled={pending} />
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
                  isDisabled={pending}
                  onSwitchChange={handleOutboundSwitchChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectDate
                  label={'Return Date'}
                  onSelectDate={handleSelectReturnDate}
                  minDate={state.outboundDate}
                  date={state.returnDate}
                  isDisabled={pending}
                  onSwitchChange={handleReturnSwitchChange}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.gridContainer} alignContent="flex-end" alignItems="flex-end">
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  color="primary"
                  className={classes.searchButton}
                  disabled={pending}
                >
                  Search
                </Button>
              </Grid>
              <Grid item xs={12}>
                <FlightList
                  loading={!!pending}
                  currency={state.currency}
                  availableCarriers={availableCarriers}
                  availableQuotes={availableQuotes}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Grid>
  );
};
