import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { CircularProgress, IconButton, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import { updateGoal } from '../actions/goal-actions';
import { selectReviewsByGoal } from '../selectors/selectors';
import Accordion from './Accordion';
import EditableTextField from './EditableTextField';
import CardGrid from './CardGrid';
import ReviewCard from './ReviewCard';
import CreateReviewForm from './CreateReviewForm';
import { Delete, HighlightOff } from '@material-ui/icons';
import DeleteButton from './DeleteButton';
import { deleteGoal } from '../actions/goal-actions';

const classes = {
  container: {
    width: '100%',
    height: '100%'
  },
  header: {
    marginTop: '30px',
    marginBottom: '30px'
  },
  headerTop: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    '& > div': {
      position: 'absolute',
      top: 0,
      right: 100
    },
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
    return !this.props.goal || !this.props.vision || !this.props.reviews;
  }

  handleUpdate = key => val => {
    const { id } = this.props.goal;
    
    this.props.dispatch(updateGoal({ id, [key]: val }));
  };

  handleDelete = () => {
    this.props.dispatch(deleteGoal(this.props.goal.id));
    this.props.history.push('/goals');
  }

  render() {
    const { goal, vision, reviews, needsReview } = this.props;

    
    if (this.loading) {
      return (
        <div>
          <CircularProgress />
        </div>
      );
    }

    const cards = reviews.map(r => <ReviewCard review={r} />);
    
    return (
      <div className={this.props.classes.container}>
        <div className={this.props.classes.header}>
          <div className={this.props.classes.headerTop}>
            <Typography variant="subtitle1">Goal</Typography>
            <DeleteButton 
              confirmMsg="Are you sure you want to delete this goal?" 
              handleDelete={this.handleDelete}
            />
          </div>
          <Typography variant="h3" align="center" gutterBottom>{goal.title}</Typography>
          <Typography variant="subtitle2" align="center">
            (From Vision: <Link to={`/visions/${vision.id}`}>{vision.title}</Link>)
            </Typography>
        </div>
        { needsReview ? <CreateReviewForm goal={goal} /> : null }
        <div className={this.props.classes.accordionContainer}>
          <Accordion title="Motivation">
            <EditableTextField
              handleUpdate={this.handleUpdate('motivation')}
              label="Motivation"
            >{goal.motivation}</EditableTextField>
          </Accordion>
          
          <Accordion title="Impact">
             <EditableTextField
              label="Impact"
              handleUpdate={this.handleUpdate('impact')}
            >{goal.impact}</EditableTextField>
          </Accordion>

          <Accordion title="Strategy">
             <EditableTextField
              label="Strategy"
              handleUpdate={this.handleUpdate('strategy')}
            >{goal.strategy}</EditableTextField>
          </Accordion>

          <Accordion title="Obstacles">
            <Typography variant="body2">{'TODO'}</Typography>
          </Accordion>

          <Accordion title="Monitoring">
             <EditableTextField
              label="Monitoring"
              handleUpdate={this.handleUpdate('monitoring')}
            >{goal.evidence}</EditableTextField>
          </Accordion>
        </div>
        <div>
          <Typography 
            style={{ paddingTop: '10px'}} 
            variant="body2" 
            color="textSecondary"
            align="center"
            gutterBottom
          >Next review due
            { ' ' + moment(goal.nextReviewDate).format('dddd, MMMM Do') }
         </Typography>
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
  let vision, reviews, needsReview;

  if (goal) {
    vision = state.entities.visions[goal.visionId];
    reviews = selectReviewsByGoal(goal.id, state);
    reviews.sort((a, b) => moment(b.created_at).isAfter(a.created_at) ? 1 : -1);
  
    const 
      now = moment(),
      nextReviewDate = moment(goal.nextReviewDate);
  
    needsReview = now > nextReviewDate;
  }

  return { goal, vision, reviews, needsReview };
};

export default withRouter(connect(mapStateToProps, null)(withStyles(classes)(GoalDetail)));