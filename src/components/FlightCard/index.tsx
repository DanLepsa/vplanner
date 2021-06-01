import React from 'react';
import { Grid, Typography, useTheme } from '@material-ui/core';
import { FlightTakeoff, Check, Clear } from '@material-ui/icons';
import { format, parseISO } from 'date-fns';

import { DateFormats } from 'types';

import { useStyles } from './styles';

interface FlightCardProps {
  isDirect: boolean;
  minPrice: number;
  outboundDate: string;
  inboundDate: string;
  outboundCarrier: string;
  inboundCarrier: string;
  selectedCurrency: string;
}

export const FlightCard = ({
  isDirect,
  minPrice,
  outboundDate,
  outboundCarrier,
  inboundDate,
  inboundCarrier,
  selectedCurrency,
}: FlightCardProps) => {
  const classes = useStyles();
  const { spacing } = useTheme();

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <div className={classes.cardItem}>
            Direct: {isDirect ? <Check fontSize={'small'} /> : <Clear fontSize={'small'} />}
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.cardItem}>
            Min price: {minPrice} {selectedCurrency}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.cardItem}>
            <FlightTakeoff style={{ marginRight: spacing() }} />
            <Typography component="span">{format(parseISO(outboundDate), DateFormats.DAY_MONTH_YEAR)}</Typography>
          </div>
        </Grid>
        <Grid item xs={6}>
          {outboundCarrier}
        </Grid>
        <Grid item xs={6}>
          <div className={classes.cardItem}>
            <FlightTakeoff className={classes.flip} style={{ marginRight: spacing() }} />
            <Typography component="span">{inboundDate}</Typography>
          </div>
        </Grid>
        <Grid item xs={6}>
          {inboundCarrier}
        </Grid>
      </Grid>
    </>
  );
};
