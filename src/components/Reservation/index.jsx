import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import axios from 'axios';
import moment from 'moment';

import { steps, _renderStepContent } from '../Helpers/settings';

import { Formik, Form } from 'formik';

import { NotificationManager } from 'react-notifications';
import validationSchema from '../Helpers/validationSchema';
import formInitialValues from '../Helpers/formInitialValues';
import checkoutFormModel from '../Helpers/checkoutFormModel';

import useStyles from './styles';
const { formId } = checkoutFormModel;

export default function Reservation() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState(null);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);

    setActiveStep(activeStep + 1);
  }

  //Handle Submit Button

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      if (activeStep === 0) {
        axios
          .get('/getreservation', {
            headers: { 'Content-Type': 'application/json' },
            params: {
              reservationID: values.reservationId,
              CheckInDate: moment(values.checkInDate).format('YYYY-MM-DD'),
            },
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              setData(res.data.body);
              setActiveStep(activeStep + 1);
              actions.setTouched({});
              actions.setSubmitting(false);
            }
          })
          .catch((error) => {
            NotificationManager.error(
              error.response.data.errorMessage,
              'Error Occured',
              5000
            );
            actions.setSubmitting(false);
            return;
          });
      } else {
        setActiveStep(activeStep + 1);
        actions.setTouched({});
        actions.setSubmitting(false);
      }
    }
  }

  //Handle Back Button
  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <React.Fragment>
      <Typography component='h1' variant='h4' align='center'>
        Reservation
      </Typography>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length ? (
          <div></div>
        ) : (
          <Formik
            initialValues={formInitialValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
                {_renderStepContent(activeStep, data)}

                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={_handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <div className={classes.wrapper}>
                    <Button
                      disabled={isSubmitting}
                      type='submit'
                      variant='contained'
                      color='primary'
                      className={classes.button}
                    >
                      {isLastStep ? 'Place order' : 'Next'}
                    </Button>
                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </React.Fragment>
    </React.Fragment>
  );
}
