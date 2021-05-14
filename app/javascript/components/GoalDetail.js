import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { CircularProgress, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import { updateGoal } from '../actions/goal-actions';
import Accordion from './Accordion';
import EditableTextField from './EditableTextField';


const classes = {
  container: {
    width: '100%',
    height: '100%'
  },
  header: {
    marginTop: '30px',
    marginBottom: '30px'
  },
  accordionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > div': {
      width: '80%'
    }
  }
};

class GoalDetail extends React.Component {
  get loading() {
    return !this.props.goal;
  }


  handleUpdate = key => val => {
    const { id } = this.props.goal;
    this.props.dispatch(updateGoal({
      id, [key]: val
    }));
  };

  render() {
    const { goal, vision } = this.props;
    if (this.loading) {
      return (
        <div>
          <CircularProgress />
        </div>
      );
    }

    return (
      <div className={this.props.classes.container}>
        <div className={this.props.classes.header}>
          <Typography variant="subtitle1" align="center">Goal</Typography>
          <Typography variant="h3" align="center" gutterBottom>{goal.title}</Typography>
          <Typography variant="subtitle2" align="center">
            (From Vision: <Link to={`/visions/${vision.id}`}>{vision.title}</Link>)
            </Typography>
        </div>
        <div className={this.props.classes.accordionContainer}>
          <Accordion title="Motivation">
            <EditableTextField
              handleUpdate={this.handleUpdate('motivation')}
            >{goal.motivation}</EditableTextField>
          </Accordion>

          <Accordion title="Impact">
             <EditableTextField
              handleUpdate={this.handleUpdate('impact')}
            >{goal.impact}</EditableTextField>
          </Accordion>

          <Accordion title="Strategy">
             <EditableTextField
              handleUpdate={this.handleUpdate('strategy')}
            >{goal.strategy}</EditableTextField>
          </Accordion>

          <Accordion title="Obstacles">
            <Typography variant="body2">{'TODO'}</Typography>
          </Accordion>

          <Accordion title="Monitoring">
             <EditableTextField
              handleUpdate={this.handleUpdate('monitoring')}
            >{goal.evidence}</EditableTextField>
          </Accordion>
        </div>
      </div>
    );
  } 
}

const mapStateToProps = (state, ownProps) => { 
  const goal = state.entities.goals[ownProps.match.params.id];
  return ({
    goal,
    vision: goal && state.entities.visions[goal.visionId]
  });
};

export default withRouter(connect(mapStateToProps, null)(withStyles(classes)(GoalDetail)));