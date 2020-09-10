import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { InputField, DatePickerField } from '../../FormFields';

export default function Login(props) {
  const {
    formField: { ReservationID, CheckInDate },
  } = props;
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Login
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <InputField
            name={ReservationID.name}
            label={ReservationID.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <DatePickerField
            name={CheckInDate.name}
            label={CheckInDate.label}
            format='yyyy/MM/dd'
            views={['year', 'month']}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
