import React from 'react';

import Login from '../Reservation/Login/index';
import MainGuest from '../Reservation/Main guest details/index';
import ReservationDetails from '../Reservation/Reservation details/index';
import EstimatedArrival from '../Reservation/Estimated Arrival/index';
import checkoutFormModel from './checkoutFormModel';
const { formField } = checkoutFormModel;

export const steps = [
  'Login',
  'Reservation details',
  'Main guest',
  'Estimated arrival',
];

//Render Forms Steps based on Step Selected
export function _renderStepContent(step, data) {
  switch (step) {
    case 0:
      return <Login formField={formField} />;
    case 1:
      return <ReservationDetails data={data} formField={formField} />;
    case 2:
      return <MainGuest data={data} />;
    case 3:
      return <EstimatedArrival />;
    default:
      return <div>Not Found</div>;
  }
}
