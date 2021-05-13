import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, Card, CardContent, CardHeader, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select, Step, StepLabel, Stepper, TextField, Typography, withStyles } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Add, AddCircleOutline, NavigateBefore, NavigateNext, RemoveCircle } from '@material-ui/icons';
import { createGoal } from '../actions/goal-actions';
import { denormalizeEntities } from '../util/normalize';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    // background: 'blue'
  },
  header: {
    marginTop: '30px',
    marginBottom: '30px'
  },
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
  section: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  stepper: {
    '& .MuiStepper-root': {
      background: 'transparent'
    }
  },
  root: {
    width: '95%',
    margin: '10px'
  },
  btnBar: {
    display: 'flex',
    justifyContent: 'center',
    '& button': {
      margin: '10px'
    }
  },
  visionSelect: {
    minWidth: '300px'
  }
};

class CreateGoalForm extends React.Component {
  constructor(props) {
    super(props);

    const deadline = moment().add(1, 'M')

    this.state = {
      activeSection: 0,
      formData: {
        visionId: null,
        title: '',
        description: '',
        motivation: '',
        impact: '',
        strategy: '',
        deadline: deadline,
        evidence: '',
        satisfaction: '',
        obstacles: [
          { description: 'Cant do it', solution: 'Do it' },
        ],
      }
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.formData.visionId === null && this.props.visions.length) {
      this.setState({ formData: {
        ...this.state.formData,
        visionId: this.props.visions[0].id
      }});
    }
  }

  handleInputChange = (event, field) => {
    switch (field) {
      case 'visionId': 
        this.setState({
          formData: {
            ...this.state.formData,
            visionId: event.target.value
          }
        });
        break;
      case 'deadline':
        this.setState({ 
          formData: { 
            ...this.state.formData, 
            deadline: event
          }
        });
        break;
      default:
        event.preventDefault();
        this.setState({
          formData: { ...this.state.formData, [field]: event.currentTarget.value }
        });
    }
  };

  handleObstacleChange = (event, field, idx) => {
    event.preventDefault();
    const obstacles = [ ...this.state.formData.obstacles ];

    const obstacle = {
      ...obstacles[idx],
      [field]: event.currentTarget.value
    };

    obstacles[idx] = obstacle;

    this.setState({ formData: { 
      ...this.state.formData,
      obstacles
    }});
  }
  
  handleAddObstacle = e => {
    e.preventDefault();

    const obstacles = [
      ...this.state.formData.obstacles,
      { description: '', solution: '' }
    ];

    this.setState({ formData: {
      ...this.state.formData,
      obstacles
    }});
  }

  handleRemoveObstacle = (e, idx) => {
    e.preventDefault();
    const { obstacles } = this.state.formData;
    this.setState({ formData: {
      ...this.state.formData,
      obstacles: [ ...obstacles.slice(0, idx), ...obstacles.slice(idx + 1) ]
    }});
  }

  loading = () => {
    return !this.state.formData.visionId;
  }

  handleSubmit = e => {
    e.preventDefault();

    const goal = this.state.formData;
    
    this.props.createGoal(goal);
  }

  render() {
    if (this.loading()) {
      return <CircularProgress />;
    }

    console.log(this.props.visions);
    console.log(this.state.formData.visionId);

    const { formData } = this.state;

    const sectionDescriptions = [
      'Describe your goal', 
      'Understand your motivation', 
      'Outline a detailed strategy', 
      'Define your obstacles',
      'Make plans for ongoing monitoring'
    ];

    const sectionContent = [
      (
        <div id="description" className={this.props.classes.section}>
          <Typography variant="subtitle1">Select a vision for this goal:</Typography>
          <FormControl className={this.props.classes.visionSelect}>
            <InputLabel>Vision</InputLabel>
            <Select 
              defaultValue=""
              value={this.state.formData.visionId} 
              onChange={e => this.handleInputChange(e, 'visionId')}
            >
              {
                this.props.visions.map(v => (
                <MenuItem key={v.id} value={v.id}>{v.title}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <Typography variant="subtitle1">Give your goal a short title.</Typography>
          <TextField 
            type="text" 
            variant="outlined"
            fullWidth
            id="title"
            label="Title"
            value={formData.title} 
            onChange={e => this.handleInputChange(e, 'title')} 
            required
          />
          <Typography variant="subtitle1">Describe your goal in detail.</Typography>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            id="description"
            label="Description"
            required
            value={formData.description}
            onChange={e => this.handleInputChange(e, "description")}
            multiline rows={3} 
            />
          </div>
      ),
      (
        <div id="motivation" className={this.props.classes.section}>
            <Typography variant="subtitle1">What is your motivation for pursuing this goal?</Typography>
            <TextField 
              type="text"
              variant="outlined"
              fullWidth
              id="motivation"
              label="Motivation"
              required
              value={formData.motivation}
              onChange={e => this.handleInputChange(e, "motivation")}
              multiline rows={3} 
            />
            <Typography variant="subtitle1">What will be the impact on your life of achieving this goal?</Typography>
            <TextField 
              type="text"
              variant="outlined"
              fullWidth
              id="impact"
              label="Impact"
              required
              value={formData.impact}
              onChange={e => this.handleInputChange(e, "impact")}
              multiline rows={3} 
            />
          </div>
      ),
      (
      <div id="strategy" className={this.props.classes.section}>
        <Typography variant="subtitle1">When is your deadline?</Typography>
        <KeyboardDatePicker
          margin="normal"
          id="deadline-picker"
          label="Deadline"
          format="YYYY-MM-DD"
          value={formData.deadline}
          inputValue={formData.deadline.format("YYYY-MM-DD")}
          onChange={e => this.handleInputChange(e, "deadline")}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <Typography variant="subtitle1">What is your detailed strategy for achieving this goal?</Typography>
        <TextField 
          type="text"
          variant="outlined"
          fullWidth
          id="strategy"
          label="Strategy"
          required
          value={formData.strategy}
          onChange={e => this.handleInputChange(e, "strategy")}
          multiline rows={3} 
        />
      </div>
      ),
      (
        <div id="obstacles" className={this.props.classes.section}>
          <Typography variant="subtitle1">What are one or more potential obstacles? How will you solve them?</Typography>
          { 
            formData.obstacles.map((o, idx) => (
              <Card key={idx} variant="outlined" className={this.props.classes.root}>
                <CardContent>
                  <div style={{ display: "flex", justifyContent: 'space-between'  }}>
                    <Typography variant="h6" align="center" gutterBottom>Obstacle</Typography>
                    <IconButton onClick={e => this.handleRemoveObstacle(e, idx) } >
                      <RemoveCircle color="error" />
                    </IconButton>
                  </div>
                  <TextField 
                    width=""
                    size="large"
                    type="text"
                    variant="outlined"
                    label="Obstacle"
                    required
                    value={formData.obstacles[idx].description}
                    multiline rows={2}
                    fullWidth
                    onChange={e => this.handleObstacleChange(e, 'description', idx)}
                  />  
                  <TextField 
                    type="text"
                    variant="outlined"
                    label="Solution"
                    required
                    value={formData.obstacles[idx].solution}
                    fullWidth
                    multiline rows={2}
                    onChange={e => this.handleObstacleChange(e, "solution", idx)}
                  />  
                </CardContent>
              </Card>
            ))
          }
          <Button 
            color="primary" 
            variant="contained"
            onClick={(e) => this.handleAddObstacle(e)}
            style={{ marginBottom: '10px' }}
            startIcon={<Add />}
          >
              Add Another Obstacle
            </Button> 
        </div>
      ),
      (
        <div id="monitoring" className={this.props.classes.section}>
            <Typography variant="subtitle1">What will you accept as evidence that you are progressing towards your goal?</Typography>
            <TextField 
              type="text"
              variant="outlined"
              fullWidth
              id="evidence"
              label="Evidence"
              required
              value={formData.evidence}
              onChange={e => this.handleInputChange(e, "evidence")}
              multiline rows={3} 
            />
            <Typography variant="subtitle1">How will things in your life have to change, measurably, for you to feel satisfied in your progress?</Typography>
            <TextField 
              type="text"
              variant="outlined"
              fullWidth
              id="satisfaction"
              label="What will make you feel satisfied in your progress?"
              required
              value={formData.satisfaction}
              onChange={e => this.handleInputChange(e, "satisfaction")}
              multiline rows={3} 
            />
          </div>
      ),
    ];

    const handleNext = () => {
      this.setState({ activeSection: this.state.activeSection + 1 });
    };

    const handleBack = () => {
      this.setState({ activeSection: this.state.activeSection - 1 });
    };

    return (
      <div className={this.props.classes.container}>
        <div className={this.props.classes.header}>
          <Typography variant="h5" align="center">Create a New Goal</Typography>
        </div>
        <div className={this.props.classes.content}>
          <div id="stepper" className={this.props.classes.stepper}>
            <Stepper activeStep={this.state.activeSection}>
              {sectionDescriptions.map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel { ...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </div>
          { sectionContent[ this.state.activeSection ] }
          <div className={this.props.classes.btnBar}>
            {(
              this.state.activeSection > 0 ?
              <Button 
                color="secondary" 
                variant="contained" 
                onClick={handleBack}
                startIcon={<NavigateBefore />}
              >
                Back
              </Button> : 
              null
            )}
            {(
              this.state.activeSection  === 4 ? 
              <Button 
                color="primary" 
                variant="contained" 
                onClick={() => this.props.handleSubmit(formData)}
              >
                Create
              </Button> :
              <Button 
                color="secondary" 
                variant="contained" 
                onClick={handleNext}
                endIcon={<NavigateNext />}
              >
                Next
              </Button> 
            )}
          </div>
          <div id="navigation">
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  visions: denormalizeEntities(state.entities.visions)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: goal => { dispatch(createGoal(goal)) }
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(CreateGoalForm)
);