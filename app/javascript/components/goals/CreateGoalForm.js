import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import moment from 'moment';
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography, withStyles } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { createGoal } from '../../actions/goal-actions';
import { denormalizeEntities } from '../../util/normalize';
import { StepperForm, StepperFormContent } from '../shared';
import CreateObstaclesForm from '../obstacles/CreateObstaclesForm';

const styles = {
  container: {
    width: '100%',
    height: '100%',
  },
  header: {
    marginTop: '30px',
    marginBottom: '0'
  },
  visionSelect: {
    minWidth: '300px'
  }
};

class CreateGoalForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      motivation: '',
      impact: '',
      strategy: '',
      deadline: moment().add(1, 'M'),
      monitoring: '',
      evidence: '',
      satisfaction: '',
      obstacles: [ { description: '', solution: '' } ],
      visionId: this.props.visions.length ? this.props.visions[0].id : null
    };
  }

  componentDidUpdate = (_, prevState) => {
    if (prevState.visionId === null && this.props.visions.length) {
      this.setState({ visionId: this.props.visions[0].id});
    }
  }

  handleInputChange = (e, field) => {
    e.preventDefault && e.preventDefault();

    let value;
    if (field === 'visionId') {
      value = e.target.value;
    } else if (field === 'deadline') {
      value = e;      
    } else {
      value = e.currentTarget.value;
    }

    this.setState({ [field]: value });
  };
  
  handleAddObstacle = e => {
    e.preventDefault();
    const obstacles = [ ...this.state.obstacles, { description: '', solution: '' } ];
    this.setState({ obstacles });
  };

  handleRemoveObstacle = (e, idx) => {
    e.preventDefault();
    const { obstacles } = this.state;
    this.setState({ 
      obstacles: [ ...obstacles.slice(0, idx), ...obstacles.slice(idx + 1) ]
    });
  };

  handleObstacleChange = (event, field, idx) => {
    event.preventDefault();
    const obstacles = [ ...this.state.obstacles ];

    const obstacle = {
      ...obstacles[idx], [field]: event.currentTarget.value
    };

    obstacles[idx] = obstacle;
    this.setState({ obstacles });
  };

  render() {
    if (!this.props.userHasVisions) {
      return <Redirect to="/visions/new" />
    }

    const stepDescriptions = [
      'Describe your goal', 
      'Understand your motivation', 
      'Outline a detailed strategy', 
      'Define your obstacles',
      'Make plans for ongoing monitoring'
    ];

    const stepContents = [
      (
        <StepperFormContent>
          <FormControl className={this.props.classes.visionSelect}>
            <InputLabel>Vision</InputLabel>
            <Select 
              value={this.state.visionId} 
              onChange={e => this.handleInputChange(e, 'visionId')}
            >
              {
                this.props.visions.map(v => (
                <MenuItem key={v.id} value={v.id}>{v.title}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <Typography variant="subtitle1">Give your goal a short title:</Typography>
          <TextField 
            type="text" 
            variant="outlined"
            fullWidth
            label="Title"
            value={this.state.title} 
            onChange={e => this.handleInputChange(e, 'title')} 
            required
          />
          <Typography variant="subtitle1">Describe your goal in detail:</Typography>
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
          <Typography variant="subtitle1">What is your motivation for pursuing this goal?</Typography>
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
          <Typography variant="subtitle1">What will be the impact on your life of achieving this goal?</Typography>
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
      ),
      (
        <StepperFormContent>
          <Typography variant="subtitle1">When is your deadline?</Typography>
          <KeyboardDatePicker
            margin="normal"
            label="Deadline"
            format="MM/DD/YYYY"
            value={this.state.deadline}
            inputValue={this.state.deadline.format("MM/DD/YYYY")}
            onChange={e => this.handleInputChange(e, "deadline")}
          />
          <Typography variant="subtitle1">What is your detailed strategy for achieving this goal?</Typography>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Strategy"
            required
            value={this.state.strategy}
            onChange={e => this.handleInputChange(e, "strategy")}
            multiline rows={5} 
          />
        </StepperFormContent>
      ),
      (
        <StepperFormContent>
          <Typography variant="subtitle1">What are one or more potential obstacles? How will you solve them?</Typography>
          <CreateObstaclesForm
            obstacles={this.state.obstacles}
            onAddObstacle={this.handleAddObstacle}
            onRemoveObstacle={this.handleRemoveObstacle}
            onObstacleChange={this.handleObstacleChange}
          />
        </StepperFormContent>
      ),
      (
        <StepperFormContent>
          <Typography variant="subtitle1">What will you accept as evidence that you are progressing towards your goal?</Typography>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Evidence"
            required
            value={this.state.evidence}
            onChange={e => this.handleInputChange(e, "evidence")}
            multiline rows={3} 
          />
          <Typography variant="subtitle1">When and how will you monitor your progress?</Typography>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Monitoring"
            required
            value={this.state.monitoring}
            onChange={e => this.handleInputChange(e, "monitoring")}
            multiline rows={3} 
          />
          <Typography variant="subtitle1">How will things in your life have to change, measurably, for you to feel satisfied in your progress?</Typography>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="What will make you feel satisfied in your progress?"
            required
            value={this.state.satisfaction}
            onChange={e => this.handleInputChange(e, "satisfaction")}
            multiline rows={3} 
          />
        </StepperFormContent>
      ),
    ];

    return (
      <div className={this.props.classes.container}>
        <div className={this.props.classes.header}>
          <Typography variant="h5" align="center">Create a New Goal</Typography>
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

const mapStateToProps = state => ({
  visions: denormalizeEntities(state.entities.visions),
  userHasVisions: Object.keys(state.entities.visions).length
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: goal => { 
    dispatch(createGoal(goal)).then(action => { 
        ownProps.history.push(`/goals/${action.payload.id}`) 
    });
  }
});

export default withRouter(withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(CreateGoalForm)
));