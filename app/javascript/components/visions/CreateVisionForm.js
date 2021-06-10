import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TextField, Typography, withStyles } from '@material-ui/core';
import { createVision } from '../../actions/vision-actions';
import { StepperForm, StepperFormContent } from '../shared';

const styles = {
  container: {
    width: '100%',
    height: '100%',
  },
  header: {
    marginTop: '30px',
    marginBottom: '30px'
  },
  root: {
    width: '95%',
    margin: '10px'
  },
  visionSelect: {
    minWidth: '300px'
  }
};

class CreateVisionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      motivation: '',
      impact: ''
    };
  }

  handleInputChange = (event, field) => {
    event.preventDefault && event.preventDefault();
    this.setState({ [field]: event.currentTarget.value });
  };
  
  handleAddObstacle = e => {
    e.preventDefault();
    const obstacles = [ ...this.state.obstacles, { description: '', solution: '' } ];
    this.setState({ obstacles });
  };

  render() {
    const stepDescriptions = [
      'Describe your vision', 
      'Understand your motivation'
    ];

    const stepContents = [
      (
        <StepperFormContent>
          <Typography variant="subtitle1">Give your vision a short title:</Typography>
          <TextField 
            type="text" 
            variant="outlined"
            fullWidth
            label="Title"
            value={this.state.title} 
            onChange={e => this.handleInputChange(e, 'title')} 
            required
          />
          <Typography variant="subtitle1">Describe your vision in detail:</Typography>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Description"
            required
            value={this.state.description}
            onChange={e => this.handleInputChange(e, "description")}
            multiline rows={3} 
            />
          </StepperFormContent>
      ),
      (
        <StepperFormContent>
          <Typography variant="subtitle1">What is your motivation for pursuing this vision?</Typography>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Motivation"
            required
            value={this.state.motivation}
            onChange={e => this.handleInputChange(e, "motivation")}
            multiline rows={3} 
          />
          <Typography variant="subtitle1">What will be the impact on your life of achieving this vision?</Typography>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Impact"
            required
            value={this.state.impact}
            onChange={e => this.handleInputChange(e, "impact")}
            multiline rows={3} 
          />
        </StepperFormContent>
      )
    ];

    return (
      <div className={this.props.classes.container}>
        <div className={this.props.classes.header}>
          <Typography variant="h5" align="center">Create a New Vision</Typography>
        </div>
        <div className={this.props.classes.content}>
          <div id="stepper" className={this.props.classes.stepper}>
            <StepperForm 
              stepDescriptions={stepDescriptions}
              stepContents={stepContents}
              handleSubmit={() => this.props.handleSubmit(this.state)}
            >
            </StepperForm>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: vision => { 
    dispatch(createVision(vision)).then(action => { 
        ownProps.history.push(`/visions/${action.payload.id}`);
    });
  }
});

export default withRouter(withStyles(styles)(
    connect(null, mapDispatchToProps)(CreateVisionForm)
));