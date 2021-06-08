import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { Typography } from '@material-ui/core';
import { SentimentVeryDissatisfied } from '@material-ui/icons';

import { FlightCard } from 'components/FlightCard';
import { API_Carrier, API_Quote } from 'types';

import { useStyles } from './styles';

interface FlightListProps {
  loading: boolean;
  error: boolean;
  currency: string;
  availableCarriers: API_Carrier[];
  availableQuotes: API_Quote[];
}

export const FlightList = ({ error, loading, currency, availableCarriers, availableQuotes }: FlightListProps) => {
  const classes = useStyles();

  const renderAvailableFlights = () => {
    if (!availableQuotes || !availableQuotes.length) {
      return;
    }

    return availableQuotes.map((quote, key) => {
      let inboundDate = 'N/A';
      let inboundCarrier = 'N/A';

      if (quote.InboundLeg) {
        inboundDate = quote.InboundLeg.DepartureDate;
        inboundCarrier =
          availableCarriers.find((carrier) => quote.InboundLeg?.CarrierIds.includes(carrier.CarrierId))?.Name || 'N/A';
      }

      const outboundCarrier =
        availableCarriers.find((carrier) => quote.OutboundLeg?.CarrierIds.includes(carrier.CarrierId))?.Name || 'N/A';

      return (
        <FlightCard
          key={key}
          isDirect={quote.Direct}
          minPrice={quote.MinPrice}
          outboundDate={quote.OutboundLeg.DepartureDate}
          inboundDate={inboundDate}
          outboundCarrier={outboundCarrier}
          inboundCarrier={inboundCarrier}
          selectedCurrency={currency}
        />
      );
    });
  };

  return (
    <div className={classes.root}>
      {error ? (
        <Typography variant="h4" className={classes.error}>
          Something went wrong <SentimentVeryDissatisfied fontSize="large" />
        </Typography>
      ) : loading ? (
        [...new Array(3)].map((_, index) => (
          <Skeleton className={classes.skeletonListItem} variant="rect" animation="wave" height={140} key={index} />
        ))
      ) : (
        renderAvailableFlights()
      )}
    </div>
  );
};
