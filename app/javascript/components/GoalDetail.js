import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import { updateGoal } from '../actions/goal-actions';
import { selectReviewsByGoal, selectObstaclesByGoal } from '../selectors/selectors';
import Accordion from './Accordion';
import EditableTextField from './EditableTextField';
import CardGrid from './CardGrid';
import ReviewCard from './ReviewCard';
import CreateReviewForm from './CreateReviewForm';
import { RemoveCircle } from '@material-ui/icons';
import DeleteButton from './DeleteButton';
import { deleteGoal } from '../actions/goal-actions';
import ObstacleCard from './ObstacleCard';
import CreateObstacleForm from './CreateObstacleForm';

const classes = theme => ({
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
  },
  obstaclesContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: '10px'
    },
    width: '100%',
    background: theme.palette.grey[100],
    borderRadius: 10,
    '& .MuiFormControl-root': {
      background: 'white'
    }
  }
});

class GoalDetail extends React.Component {
  get loading() {
    return (
      !this.props.goal || !this.props.vision  || 
      !this.props.reviews || !this.props.obstacles
    )
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
    const { goal, vision, obstacles, reviews, needsReview } = this.props;
    
    if (this.loading) {
      return <div><CircularProgress /></div>;
    }

    const reviewCards = reviews.map(r => <ReviewCard review={r} />);
    const obstacleCards = obstacles.map(o => <ObstacleCard obstacle={o} />);
    
    return (
      <div className={this.props.classes.container}>
        <div className={this.props.classes.header}>
          <div className={this.props.classes.headerTop}>
            <Typography variant="subtitle1">Goal</Typography>
            <DeleteButton 
              confirmMsg="Are you sure you want to delete this goal?" 
              handleDelete={this.handleDelete}
              icon={<RemoveCircle color="disabled" />}
            />
          </div>
          <Typography variant="h3" align="center" gutterBottom>{goal.title}</Typography>
          <Typography variant="subtitle2" align="center">
            (From Vision: <Link to={`/visions/${vision.id}`}>{vision.title}</Link>)
          </Typography>
        { needsReview ? <CreateReviewForm goal={goal} /> : null }
        </div>
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
            <div className={this.props.classes.obstaclesContainer}>
              <CardGrid 
                cards={obstacleCards} 
                breakpoints={{ xs: 12, sm: 12, md: 6 }}
              />
              <CreateObstacleForm />
            </div>
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
            <CardGrid cards={reviewCards} />
          </div>
        </div>
      </div>
    );
  } 
}

const mapStateToProps = (state, ownProps) => { 
  const goal = state.entities.goals[ownProps.match.params.id];
  let vision, reviews, obstacles, needsReview;

  if (goal) {
    vision = state.entities.visions[goal.visionId];
    reviews = selectReviewsByGoal(goal.id, state);
    reviews.sort((a, b) => moment(b.created_at).isAfter(a.created_at) ? 1 : -1);
    obstacles = selectObstaclesByGoal(goal.id, state);
  
    const 
      now = moment(),
      nextReviewDate = moment(goal.nextReviewDate);
  
    needsReview = now > nextReviewDate;
  }

  return { goal, vision, reviews, obstacles, needsReview };
};

export default withRouter(connect(mapStateToProps, null)(withStyles(classes)(GoalDetail)));