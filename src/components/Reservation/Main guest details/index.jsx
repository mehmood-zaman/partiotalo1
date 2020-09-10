import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { InputField, DatePickerField } from '../../FormFields';

export default function MainGuestsDetails({ data }) {
  let mainGuests = [];
  if (data !== null) {
    mainGuests = data.guestList.filter((e) => {
      return e.isMainGuest === true;
    });
  }

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Main Guests
      </Typography>
      {mainGuests.map((item) => {
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputField
                name={item.guestFirstName}
                label={item.guestFirstName}
                fullWidth
              />
            </Grid>
            {/* <Grid item xs={12} md={12}>
              <DatePickerField
                // name={CheckInDate.name}
                // label={CheckInDate.label}
                format='yyyy/MM/dd'
                views={['year', 'month']}
                fullWidth
              />
            </Grid> */}
          </Grid>
        );
      })}
    </React.Fragment>
  );
}
