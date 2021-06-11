import React from 'react';
import { Button, Step, StepLabel, Stepper, withStyles } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';

const styles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > div': {
      width: '80%'
    },
    '& div.MuiInputBase-root': {
      marginBottom: '15px'
    }
  },
  stepper: {
    '& .MuiStepper-root': {
      background: 'transparent'
    }
  },
  btnBar: {
    display: 'flex',
    justifyContent: 'center',
    '& button': {
      margin: '10px'
    },
  }
};

class StepperForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { activeStep: 3 };
  }

  handleNext = () => {
    this.setState({ activeStep: this.state.activeStep + 1 });
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  render() {
    const { stepContents, stepDescriptions, handleSubmit } = this.props;
    const steps = stepContents.length;

    return (
      <div className={this.props.classes.content}>
        <div id="stepper" className={this.props.classes.stepper}>
          <Stepper activeStep={this.state.activeStep}>
            {stepDescriptions.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
        { stepContents[ this.state.activeStep ] }
        <div className={this.props.classes.btnBar}>
          {(
            this.state.activeStep > 0 ?
            <Button 
              color="secondary" 
              variant="contained" 
              onClick={this.handleBack}
              startIcon={<NavigateBefore />}
            >
              Back
            </Button> : 
            null
          )}
          {
            this.state.activeStep  < (steps - 1) ? 
            (
              <Button 
                color="secondary" 
                variant="contained" 
                onClick={this.handleNext}
                endIcon={<NavigateNext />}
              >
                Next
              </Button> 
            ): (
              <Button 
                color="primary" 
                variant="contained" 
                onClick={handleSubmit}
              >
                Create
              </Button> 
            )
          }
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(StepperForm);