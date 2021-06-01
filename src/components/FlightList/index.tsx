import { Skeleton } from '@material-ui/lab';
import React from 'react';

import { FlightCard } from 'components/FlightCard';
import { API_Carrier, API_Quote } from 'types';

import { useStyles } from './styles';

interface FlightListProps {
  loading: boolean;
  currency: string;
  availableCarriers: API_Carrier[];
  availableQuotes: API_Quote[];
}

export const FlightList = ({ loading, currency, availableCarriers, availableQuotes }: FlightListProps) => {
  const classes = useStyles();

  const renderAvailableFlights = () => {
    if (!availableQuotes || !availableQuotes.length) {
      return;
    }
    console.log(availableQuotes);
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
      {loading
        ? [...new Array(3)].map((_, index) => (
            <Skeleton className={classes.skeletonListItem} variant="rect" animation="wave" height={140} key={index} />
          ))
        : renderAvailableFlights()}
    </div>
  );
};
