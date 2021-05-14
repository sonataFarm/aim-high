import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { CircularProgress, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import { updateGoal } from '../actions/goal-actions';
import { selectReviewsByGoal } from '../selectors/selectors';
import Accordion from './Accordion';
import EditableTextField from './EditableTextField';
import CardGrid from './CardGrid';
import ReviewCard from './ReviewCard';

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
    
    this.props.dispatch(updateGoal({ id, [key]: val }));
  };

  render() {
    const { goal, vision, reviews } = this.props;

    const cards = reviews.map(r => <ReviewCard review={r} />);

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
        <div>
          <Typography 
            style={{ paddingTop: '10px'}} 
            variant="subtitle2" 
            align="center"
            gutterBottom
          >Reviews</Typography>
          <div className={this.props.classes.cardGridContainer}>
            <CardGrid cards={cards} />
          </div>
        </div>
      </div>
    );
  } 
}

const mapStateToProps = (state, ownProps) => { 
  const goal = state.entities.goals[ownProps.match.params.id];
  const vision = goal ? state.entities.visions[goal.visionId] : null;
  const reviews = goal ? selectReviewsByGoal(goal.id, state) : [];
  const m = moment;
  if (reviews.length) 1;

  reviews.sort((a, b) => moment(b.created_at).isAfter(a.created_at) ? 1 : -1)
  
  return { goal, vision, reviews };
};

export default withRouter(connect(mapStateToProps, null)(withStyles(classes)(GoalDetail)));